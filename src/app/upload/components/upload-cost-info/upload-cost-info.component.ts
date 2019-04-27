import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataNodeService} from '../../../services/data-node.service';
import {MetaInformationModel} from "../../models/meta-information.model";

@Component({
  selector: 'app-upload-cost-info',
  templateUrl: './upload-cost-info.component.html',
  styleUrls: ['./upload-cost-info.component.scss']
})
export class UploadCostInfoComponent implements OnChanges, OnInit {

  @Input()
  dataBlob: Blob;

  @Input()
  metaData: MetaInformationModel;

  dataSize: number;
  metaSize: number;
  estimatedGas: number;

  private encoder: TextEncoder = new TextEncoder();

  constructor(private dataNodeService: DataNodeService) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataBlob) {
      this.analyzeBlob();
    }
  }

  ngOnInit(): void {
  }


  private analyzeBlob() {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as ArrayBuffer;

      const metaDataJSON = JSON.stringify(this.metaData.getMetaInformationObject());

      this.metaSize = this.encoder.encode(metaDataJSON).byteLength;
      this.dataSize = result.byteLength;

      this.updateEstimatedGas(result);
    };
    reader.readAsArrayBuffer(this.dataBlob);
  }


  private async updateEstimatedGas(result) {
    this.estimatedGas = await this.dataNodeService.estimateGasForPostingDataTransaction(result, this.metaData.getMetaInformationObject());
  }

  getTotalSize(): number {
    return this.dataSize + this.metaSize;
  }

}
