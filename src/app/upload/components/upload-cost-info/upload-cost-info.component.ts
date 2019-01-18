import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataNodeService} from '../../../services/data-node.service';

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


  private async analyzeBlob() {
    const reader = new FileReader();

    reader.onload = async () => {
      const metaData = {
        type: this.dataBlob.type
      };

      const result = reader.result as ArrayBuffer;

      const metaDataJSON = JSON.stringify(metaData);

      this.metaSize = this.encoder.encode(metaDataJSON).byteLength;
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
