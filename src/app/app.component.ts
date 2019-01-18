import {Component} from '@angular/core';
import {Web3Service, WEB3_SERVICE_STATE} from './services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  WEB3_SERVICE_STATE = WEB3_SERVICE_STATE;
  title = 'data-node';

  constructor(private web3Service: Web3Service) {
  }

  getWeb3State(): WEB3_SERVICE_STATE {
    return this.web3Service.state;
  }
}
