import {Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GasPriceInfo} from "./gas-price-info.service";


export interface EthMarketEntry {
  Label: string;
  Name: string;
  Price: number;
  Volume_24h: string;
  Timestamp: string;
}

export interface EthMarket {
  Markets: EthMarketEntry[]
}

@Injectable({
  providedIn: 'root'
})
export class EtherPrizeInfoService{

  private key: string = 'EFU4FNSzC2g93xo04h3stHKGa0VOiG';
  private url: string = `https://www.worldcoinindex.com/apiservice/ticker?key=${this.key}&label=ethbtc&fiat=usd`;

  ethDollarPrice: number= 0;

  constructor(private http: HttpClient) {
  }

  async getEthDollarPriceInfo(): Promise<number> {
    if (!this.ethDollarPrice && this.url) {
      //const ethMarket = await this.http.get<EthMarket>(this.url).toPromise();
      //this.url = undefined;
      //this.ethDollarPrice = ethMarket.Markets[0].Price;
    }
    return this.ethDollarPrice;
  }
}
