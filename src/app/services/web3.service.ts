import {Injectable} from '@angular/core';
import * as Web3 from 'web3';
import {bytesToHex, hexToBytes, hexToString, stringToHex, toWei, fromWei} from "web3-utils";

@Injectable()
export class Web3Service {
  private web3: Promise<any>;


  private async trySetupWeb3(provider: any):Promise<any> {

    try {
      const web3 = new Web3(provider);
      // Request account access if needed
      await provider.enable();
      return new Promise(resolve => resolve(web3));
    } catch (error) {
      console.log(error);
      return new Promise((resolve, reject) => reject(error));
    }

  }

  constructor() {
    const provider = window['ethereum'];
    if (provider) {
      console.log('setup metamask');
      this.web3 = this.trySetupWeb3(provider);
    } else if (window['web3']) {
      console.log('setup metamask (legacy)');
      this.web3 = new Promise(resolve => resolve(new Web3(window['web3'].currentProvider)));
    } else {
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

  toWei(value: number | string, unit: string): number{
    return toWei(value, unit);
  }

  fromWei(value: number | string, unit: string): number{
    return fromWei(value, unit);
  }

  fromUnitToUnit(value: number | string, fromUnit: string, toUnit: string){
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
