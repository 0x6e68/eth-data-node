import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {

  data: string;
  dataBlob: Blob;

  constructor() { }

  ngOnInit() {
  }

  dataUpdated(event: string){
    this.dataBlob = new Blob([event], {type: 'text/plain'});
  }

}
