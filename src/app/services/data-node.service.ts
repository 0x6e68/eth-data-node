import {Injectable} from '@angular/core';
import {Web3Service} from "./web3.service";
import {DATA_NODE_ABI} from "../config/data-node-abi";
import {DataTransactionModel} from "../models/data-transaction.model";

@Injectable()
export class DataNodeService {

  private contractPromise: Promise<any>;

  constructor(private web3Service: Web3Service) {
    this.contractPromise = web3Service.getWeb3().then(web3 => {
      const contract = new web3.eth.Contract(DATA_NODE_ABI, '0x79caa0af14d8a757faba869801e1a98b5b187f0e');
      contract.setProvider(web3.currentProvider);

      return contract;
    });
  }

  private async executeOnContract(f: (contract: any) => any): Promise<any> {
    const constract = await this.contractPromise;
    return new Promise<any>(resolve => resolve(f(constract)));
  }

  async postDataTransaction(data: ArrayBuffer, metaData: Object) {
    const web3 = await this.web3Service.getWeb3();
    const account = await this.web3Service.getAccount();

    const transaction = await this.createTransaction(data, metaData);
    transaction.send({from: account});
  }

  async estimateGasForPostingDataTransaction(data: ArrayBuffer, metaData: Object): Promise<number>{
    const web3 = await this.web3Service.getWeb3();
    const account = await this.web3Service.getAccount();

    const transaction = await this.createTransaction(data, metaData);
    return transaction.estimateGas({from: account});
  }

  async getPastEvents(): Promise<DataTransactionModel[]> {
    return this.executeOnContract(contract => {
      return contract.getPastEvents('DataAdded', {
        fromBlock: 0,
        toBlock: 'latest'
      }).then(events => {

        let dataPromises = [];
        events.forEach(event => {
          dataPromises.push(this.extractDataFromEvent(event));
        });

        return Promise.all(dataPromises);
        });
    });
  }

  private async createTransaction(data: ArrayBuffer, metaData: Object): Promise<any> {
    const bytesString = this.web3Service.arrayBufferToHex(data);
    const metaDataJson = metaData !== undefined ? JSON.stringify(metaData) : '{}';

    return this.executeOnContract(contract => contract.methods.postDataTransaction(bytesString, metaDataJson));
  }

  async extractDataFromEvent(event: any): Promise<DataTransactionModel> {
    const hash: string = event.transactionHash;
    const index = event.returnValues['index'];

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
