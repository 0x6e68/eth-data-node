import { Component, OnInit } from '@angular/core';
import {DATA_NODE_CONFIG} from "../config/data-node-config";

@Component({
  selector: 'app-contract-address-config',
  templateUrl: './contract-address-config.component.html',
  styleUrls: ['./contract-address-config.component.scss']
})
export class ContractAddressConfigComponent implements OnInit {

  defaultAddress: string = DATA_NODE_CONFIG.defaultAddress;

  constructor() { }

  ngOnInit() {
  }

}
