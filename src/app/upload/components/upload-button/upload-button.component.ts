import {Component, Input, OnInit} from '@angular/core';
import {DataNodeService} from '../../../services/data-node.service';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {

  @Input()
  dataBlob: Blob;

  contractReady = false;

  constructor(private dataNodeService: DataNodeService) {
  }

  ngOnInit() {
    this.dataNodeService.contractReady.subscribe((contractReady)=> this.contractReady = contractReady);
  }

  postDataTransaction() {
    if (this.dataBlob) {

      const reader = new FileReader();

      reader.onload = () => {
        const metaData = {
          type: this.dataBlob.type
        };

        const result = reader.result as ArrayBuffer;
        this.dataNodeService.postDataTransaction(result, metaData);

      };

      reader.readAsArrayBuffer(this.dataBlob);
    }
  }
}
