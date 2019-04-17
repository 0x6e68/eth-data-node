import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DataNodeService} from "../services/data-node.service";
import {environment} from "../../environments/environment.prod";

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
      address: new FormControl(environment.contract.defaultAddress),
    });
  }

  onSubmit() {
    this.dataNodeService.loadContractAtAddress(this.form.get('address').value);
  }
}
