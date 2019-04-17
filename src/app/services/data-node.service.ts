import {Injectable, OnInit} from '@angular/core';
import {Web3Service} from "./web3.service";
import {DATA_NODE_ABI} from "../config/data-node-abi";
import {DataTransactionModel} from "../models/data-transaction.model";
import {Subject} from "rxjs";
import {environment} from "../../environments/environment.prod";

@Injectable()
export class DataNodeService implements OnInit {

  private contract;

  private contractReadySubject = new Subject<boolean>();
  contractReady = this.contractReadySubject.asObservable();

  constructor(private web3Service: Web3Service) {
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

  getPastEventsWithIndicesAndSenderAddress(indices: number[], address: string): Promise<DataTransactionModel[]> {
    const filter = {};

    if (indices) {
      filter['index'] = indices;
    }

    if (environment.contract.onlyLoadDataWithOriginAddress) {
      address = environment.contract.onlyLoadDataWithOriginAddress;
    }

    if (address) {
      filter['from'] = address;
    }

    return this.getPastEventsWithFilter(filter);
  }

  async getNextIndex(): Promise<number> {
    return this.contract.methods.getNextIndex().call();
  }

  private getPastEventsWithFilter(filter: Object): Promise<DataTransactionModel[]> {
    const startFromBlockNumber = environment.contract.searchFromBlockNumber | 0;

    return this.contract.getPastEvents('DataAdded', {
      fromBlock: startFromBlockNumber,
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
    const txHash: string = event.transactionHash;
    const index = event.returnValues['usedIndex'];

    const transaction = await this.web3Service.getTransaction(txHash);
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

  ngOnInit(): void {
    this.loadContractAtAddress(environment.contract.defaultAddress);
  }


}
