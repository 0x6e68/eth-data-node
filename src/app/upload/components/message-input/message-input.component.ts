import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent{

  data: string;
  dataBlob: Blob;

  constructor() {
  }

  dataUpdated(event: string): void {
    this.dataBlob = new Blob([event], {type: 'text/plain'});
  }

}
