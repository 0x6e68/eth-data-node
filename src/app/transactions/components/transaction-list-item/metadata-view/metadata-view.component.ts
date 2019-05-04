import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-metadata-view',
  templateUrl: './metadata-view.component.html',
  styleUrls: ['./metadata-view.component.scss']
})
export class MetadataViewComponent implements OnInit {

  @Input()
  metaData: Object;

  constructor() {
  }

  ngOnInit() {
  }

  getMetaDataPairList(): string[] {
    return Object.keys(this.metaData).map(key => key + " : " + this.metaData[key]);
  }

}
