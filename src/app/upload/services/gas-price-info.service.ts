import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface GasPriceInfo {
  safeLow: number;
  standard: number;
  fast: number;
  fastest: number;
}

export type GasPriceType = 'safeLow' | 'standard' | 'fast' | 'fastest';

@Injectable({
  providedIn: 'root'
})
export class GasPriceInfoService implements OnInit {

  private url: string = 'https://www.etherchain.org/api/gasPriceOracle';

  gasPriceInfoObservable: Observable<GasPriceInfo>;

  constructor(private http: HttpClient) {
    this.gasPriceInfoObservable = this.http.get<GasPriceInfo>(this.url);
  }

  ngOnInit(): void {

  }

}
