import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataNodeService} from "../../../services/data-node.service";
import {GasPriceInfo, GasPriceInfoService} from "../../services/gas-price-info.service";
import {Observable} from "rxjs";
import {Web3Service} from "../../../services/web3.service";
import {EtherPrizeInfoService} from "../../services/ether-prize-info.service";

@Component({
  selector: 'app-upload-cost-info',
  templateUrl: './upload-cost-info.component.html',
  styleUrls: ['./upload-cost-info.component.scss']
})
export class UploadCostInfoComponent implements OnChanges, OnInit {

  @Input()
  dataBlob: Blob;

  dataSize: number;
  metaSize: number;
  estimatedGas: number;

  gasPrizeInfo: GasPriceInfo;



  constructor(private dataNodeService: DataNodeService,
              private gasPrizeService: GasPriceInfoService,
              private web3: Web3Service,
              private ethPrizeService: EtherPrizeInfoService) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataBlob) {
      this.analyzeBlob();
    }
  }

  ngOnInit(): void {
    this.gasPrizeService.getGasPriceInfo().subscribe((value)=>{
      this.gasPrizeInfo = value;
    });
  }

  calcTotalGasPrizeEther(gasPrizeGwei: number){
    if(gasPrizeGwei && this.estimatedGas){
      return this.web3.fromUnitToUnit(gasPrizeGwei, 'gwei', 'ether') * this.estimatedGas;
    }
    return "N/A";
  }

  async calcTotalDollarPrize(totalEtherCost: number){
    return (await this.ethPrizeService.getEthDollarPriceInfo()) * totalEtherCost;
  }

  private async analyzeBlob() {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const metaData = {
        type: this.dataBlob.type
      };

      const result = reader.result as ArrayBuffer;

      const metaDataJSON = JSON.stringify(metaData);

      this.metaSize = metaDataJSON.length;
      this.dataSize = result.byteLength;

      await this.updateEstimatedGas(result, metaData);
    };
    reader.readAsArrayBuffer(this.dataBlob);
  }


  private async updateEstimatedGas(result, metaData) {
    this.estimatedGas = await this.dataNodeService.estimateGasForPostingDataTransaction(result, metaData);
  }

  getTotalSize(): number {
    return this.dataSize + this.metaSize;
  }


}
