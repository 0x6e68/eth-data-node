import {Component} from '@angular/core';
import {MetaInformationModel} from "../../models/meta-information.model";

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent{

  data: string;
  dataBlob: Blob;
  metaInformations:MetaInformationModel;

  constructor() {
    this.metaInformations = new MetaInformationModel();
  }

  dataUpdated(event: string): void {
    this.dataBlob = new Blob([event], {type: 'text/plain'});
    this.metaInformations.createOrUpdateKeyValue({key: 'type', value: 'text/plain'});
  }

}
