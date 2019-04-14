import {Component, Input, OnInit} from '@angular/core';
import {DataNodeService} from '../../../services/data-node.service';
import {MetaInformationModel} from "../../models/meta-information.model";

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {

  @Input()
  dataBlob: Blob;

  @Input()
  metaInformations: MetaInformationModel;

  contractReady = false;

  constructor(private dataNodeService: DataNodeService) {
  }

  ngOnInit() {
    this.dataNodeService.contractReady.subscribe((contractReady) => this.contractReady = contractReady);
  }


  readFileAndPostDataTransaction() {
    if (this.dataBlob) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as ArrayBuffer;
        this.dataNodeService.postDataTransaction(result, this.metaInformations.getMetaInformationObject());
      };
      reader.readAsArrayBuffer(this.dataBlob);
    }
  }
}
