import {Component, OnInit} from '@angular/core';
import {WEB3_SERVICE_STATE, Web3Service} from '../services/web3.service';

@Component({
  selector: 'app-no-eth-browser',
  templateUrl: './no-eth-browser.component.html',
  styleUrls: ['./no-eth-browser.component.scss']
})
export class NoEthBrowserComponent {
  WEB3_SERVICE_STATE = WEB3_SERVICE_STATE;

  constructor(private web3Service: Web3Service) {
  }

  getWeb3State(): WEB3_SERVICE_STATE {
    return this.web3Service.state;
  }
}
