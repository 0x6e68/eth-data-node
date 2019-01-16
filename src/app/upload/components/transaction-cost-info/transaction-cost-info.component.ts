import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GasPriceInfoService, GasPriceType} from "../../services/gas-price-info.service";
import {Web3Service} from "../../../services/web3.service";
import {EtherPrizeInfoService} from "../../services/ether-prize-info.service";

@Component({
  selector: 'app-transaction-cost-info',
  templateUrl: './transaction-cost-info.component.html',
  styleUrls: ['./transaction-cost-info.component.scss']
})
export class TransactionCostInfoComponent implements OnInit, OnChanges {
  @Input()
  prizeType: GasPriceType;

  @Input()
  estimatedGas: number;

  gasPrizeGwei: number;
  gasPrizeEther: number;
  etherPrizeDollar: number;

  constructor(private web3: Web3Service, private ethPrizeService: EtherPrizeInfoService, private gasPriceInfoService: GasPriceInfoService) {
  }

  ngOnInit() {
    this.gasPriceInfoService.gasPriceInfoObservable.subscribe(value => {
      this.gasPrizeGwei = value[this.prizeType];
      this.calcTotalGasPrizeEther();
    });

    this.ethPrizeService.ethDollarPrice.subscribe(value => {
      this.etherPrizeDollar = value
    });
  }


  private calcTotalGasPrizeEther() {
    if(this.gasPrizeGwei){
      this.gasPrizeEther = this.web3.fromUnitToUnit(this.gasPrizeGwei + '', 'gwei', 'ether');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calcTotalGasPrizeEther();
  }
}
