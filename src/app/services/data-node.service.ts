import {Injectable} from '@angular/core';
import {Web3Service} from "./web3.service";
import {DATA_NODE_ABI} from "../config/data-node-abi";
import {DataTransactionModel} from "../models/data-transaction.model";
import {DATA_NODE_CONFIG} from "../config/data-node-config";
import {Subject} from "rxjs";

@Injectable()
export class DataNodeService {

  private contract;

  private contractReadySubject = new Subject<boolean>();
  contractReady = this.contractReadySubject.asObservable();

  constructor(private web3Service: Web3Service) {
    this.loadContractAtAddress(DATA_NODE_CONFIG.defaultAddress);
  }

  async loadContractAtAddress(address: string) {
    const web3 = await this.web3Service.getWeb3();
    const contract = new web3.eth.Contract(DATA_NODE_ABI, address);
    contract.setProvider(web3.currentProvider);
    this.contract = contract;
    this.contractReadySubject.next(this.contractReady !== undefined);
  }


  async postDataTransaction(data: ArrayBuffer, metaData: Object) {
    const account = await this.web3Service.getAccount();

    const transaction = await this.createTransaction(data, metaData);
    transaction.send({from: account});
  }

  async estimateGasForPostingDataTransaction(data: ArrayBuffer, metaData: Object): Promise<number> {
    const account = await this.web3Service.getAccount();

    const transaction = this.createTransaction(data, metaData);
    return transaction.estimateGas({from: account});
  }

  getPastEventsWithIndices(indices: number[]): Promise<DataTransactionModel[]> {
    return this.getPastEventsWithFilter({index: indices});
  }

  getPastEventsFromSender(address: string): Promise<DataTransactionModel[]> {
    return this.getPastEventsWithFilter({from: address});
  }

  async getNextIndex(): Promise<number>{
    return this.contract.methods.getNextIndex().call();
  }

  private getPastEventsWithFilter(filter: Object): Promise<DataTransactionModel[]> {
    return this.contract.getPastEvents('DataAdded', {
      fromBlock: 0,
      toBlock: 'latest',
      filter: filter
    }).then(events => {
      const dataPromises = [];
      events.forEach(event => {
        dataPromises.push(this.extractDataFromEvent(event));
      });

      return Promise.all(dataPromises);
    });
  }


  private createTransaction(data: ArrayBuffer, metaData: Object) {
    const bytesString = this.web3Service.arrayBufferToHex(data);
    const metaDataJson = metaData !== undefined ? JSON.stringify(metaData) : '{}';

    return this.contract.methods.postDataTransaction(bytesString, metaDataJson);
  }

  async extractDataFromEvent(event: any): Promise<DataTransactionModel> {
    const hash: string = event.transactionHash;
    const index = event.returnValues['usedIndex'];

    const transaction = await this.web3Service.getTransaction(hash);
    const rawData = await this.web3Service.extractTransactionData(['bytes', 'string'], transaction);

    const data: Uint8Array = this.web3Service.hexToUint8Array(rawData[0]);
    const metaData = JSON.parse(rawData[1]);

    const dataModel: DataTransactionModel = {
      data: data,
      author: transaction.from,
      block: transaction.blockNumber,
      metaData: metaData,
      index: index
    };


    return dataModel;
  }


}
