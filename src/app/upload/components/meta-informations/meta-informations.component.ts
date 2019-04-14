import {Component, Input, OnInit} from '@angular/core';
import {MetaInformationModel} from "../../models/meta-information.model";

@Component({
  selector: 'app-meta-informations',
  templateUrl: './meta-informations.component.html',
  styleUrls: ['./meta-informations.component.scss']
})
export class MetaInformationsComponent implements OnInit {

  @Input()
  metaInformations: MetaInformationModel;

  constructor() {
  }

  ngOnInit() {
  }


}
