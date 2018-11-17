import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {DataTransactionModel} from "../models/data-transaction.model";
import {DataNodeService} from "../services/data-node.service";
import {Web3Service} from "../services/web3.service";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  dataBlocks: DataTransactionModel[] = [];
  private indexOfLastEntry: number;


  constructor(private dataNodeService: DataNodeService, private web3Service: Web3Service, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loadTransactions();
  }


  async loadTransactions() {
    this.dataBlocks = await this.dataNodeService.getPastEvents();
  }


}
