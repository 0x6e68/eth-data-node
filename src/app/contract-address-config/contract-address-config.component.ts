import { Component, OnInit } from '@angular/core';
import {DATA_NODE_CONFIG} from "../config/data-node-config";
import {FormControl, FormGroup} from "@angular/forms";
import {DataNodeService} from "../services/data-node.service";

@Component({
  selector: 'app-contract-address-config',
  templateUrl: './contract-address-config.component.html',
  styleUrls: ['./contract-address-config.component.scss']
})
export class ContractAddressConfigComponent implements OnInit {

  form: FormGroup;

  constructor(private dataNodeService: DataNodeService) { }

  ngOnInit() {
    this.form = new FormGroup({
      address: new FormControl(DATA_NODE_CONFIG.defaultAddress),
    });
  }

  onSubmit() {
    this.dataNodeService.loadContractAtAddress(this.form.get('address').value);
  }

}
