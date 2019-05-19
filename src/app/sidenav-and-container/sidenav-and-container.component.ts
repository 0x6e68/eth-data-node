import {Component, OnInit} from '@angular/core';
import {WEB3_SERVICE_STATE, Web3Service} from "../services/web3.service";

@Component({
  selector: 'app-sidenav-and-container',
  templateUrl: './sidenav-and-container.component.html',
  styleUrls: ['./sidenav-and-container.component.scss']
})
export class SidenavAndContainerComponent implements OnInit {
  WEB3_SERVICE_STATE = WEB3_SERVICE_STATE;
  showSideNav: boolean = false;

  constructor(private web3Service: Web3Service) {
  }

  ngOnInit() {
  }

  getWeb3State(): WEB3_SERVICE_STATE {
    return this.web3Service.state;
  }

  toggleShowHideSideNav() {
    this.showSideNav = !this.showSideNav;
  }

  isWeb3Ready() {
    return this.web3Service.state === WEB3_SERVICE_STATE.READY || this.isWeb3ReadOnly();
  }

  isWeb3ReadOnly() {
    return this.web3Service.state === WEB3_SERVICE_STATE.READY_READ_ONLY;
  }

}
