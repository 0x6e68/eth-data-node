import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


export interface EthMarketEntry {
  Label: string;
  Name: string;
  Price: number;
  Volume_24h: string;
  Timestamp: string;
}

export interface EthMarket {
  Markets: EthMarketEntry[];
}

@Injectable({
  providedIn: 'root'
})
export class EtherPrizeInfoService implements OnInit {

  private key: string = 'EFU4FNSzC2g93xo04h3stHKGa0VOiG';
  private url: string = `https://www.worldcoinindex.com/apiservice/ticker?key=${this.key}&label=ethbtc&fiat=usd`;

  ethDollarPrice: Observable<number>;

  constructor(private http: HttpClient) {
    this.ethDollarPrice = this.http.get<EthMarket>(this.url)
      .pipe(map(ethMarket => ethMarket.Markets[0].Price));
  }

  ngOnInit(): void {

  }
}
