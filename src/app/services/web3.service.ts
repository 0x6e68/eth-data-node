import {Injectable} from '@angular/core';
import * as W3 from 'web3';
const Web3 = require('web3'); // tslint:disable-line

import {bytesToHex, hexToBytes, hexToString, stringToHex, toWei, fromWei, Unit} from "web3-utils";

export enum WEB3_SERVICE_STATE {
  SETUP,
  TRY_GET_ACCESS_FROM_METAMASK,
  READY,
  NO_WEB3_FOUND,
  ERROR
}

@Injectable()
export class Web3Service {
  private web3: Promise<any>;

  state: WEB3_SERVICE_STATE;

  private async trySetupWeb3(provider: any):Promise<any> {
    try {
      const web3:W3.default = new Web3(provider);
      // Request account access if needed
      this.state = WEB3_SERVICE_STATE.TRY_GET_ACCESS_FROM_METAMASK;
      await provider.enable();
      this.state = WEB3_SERVICE_STATE.READY;
      return new Promise(resolve => {
        return resolve(web3)
      });
    } catch (error) {
      console.log(error);
      this.state = WEB3_SERVICE_STATE.ERROR;
      return new Promise((resolve, reject) => reject(error));
    }

  }

  constructor() {
    this.state = WEB3_SERVICE_STATE.SETUP;
    const provider = window['ethereum'];
    if (provider) {
      this.web3 = this.trySetupWeb3(provider);

    } else if (window['web3']) {
      this.state = WEB3_SERVICE_STATE.READY;
      this.web3 = new Promise(resolve => {
        const web3 = new Web3(window['web3'].currentProvider);
        return resolve(web3);
      });
    } else {
      this.state = WEB3_SERVICE_STATE.NO_WEB3_FOUND;
      console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  getWeb3(): Promise<any> {
    return this.web3;
  }

  async getGasLimit(): Promise<any>{
    const web3 = await this.web3;
    const block = await web3.eth.getBlock("latest");

    return block.gasLimit;
  }

  arrayBufferToHex(data: ArrayBuffer): string{
    return this.uint8ArrayToHex(new Uint8Array(data));
  }

  uint8ArrayToHex(data: Uint8Array): string{
    const dataArray = Array.from(data);
    return  bytesToHex(dataArray);
  }

  uint8ArrayToString(data: Uint8Array): string{
    const dataArray = Array.from(data);
    return  hexToString(bytesToHex(dataArray));
  }

  hexToUint8Array(hex: string): Uint8Array{
    return new Uint8Array(hexToBytes(hex));
  }

  hexToString(hex: string): string{
    return hexToString(hex);
  }

  stringToHex(input: string): string{
    return stringToHex(input);
  }

  toWei(value: string, unit: Unit): string{
    return toWei(value, unit);
  }

  fromWei(value: string, unit: Unit): string{
    return fromWei(value, unit);
  }

  fromUnitToUnit(value: string, fromUnit: Unit, toUnit: Unit){
    const weiValue = this.toWei(value, fromUnit);
    return fromWei(weiValue, toUnit);
  }

  async getTransaction(hash: string): Promise<any>{
    const web3 = await this.getWeb3();
    return web3.eth.getTransaction(hash);
  }

  async extractTransactionData(types:string[], transaction: any): Promise<string[]>{
    const web3 = await this.getWeb3();
    return web3.eth.abi.decodeParameters(types, '0x' +transaction.input.slice(10));
  }

  getAccount(): Promise<string> {
    return this.web3.then(web3 => {
      return web3.eth.getAccounts().then(accounts => accounts[0]);
    });
  }
}
