import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataTransactionModel} from "../../../models/data-transaction.model";
import {DataNodeService} from "../../../services/data-node.service";
import {Web3Service} from "../../../services/web3.service";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  dataBlocks: DataTransactionModel[] = [];
  private indexOfLastEntry: number;
  private contractReady = false;


  constructor(private dataNodeService: DataNodeService, private web3Service: Web3Service, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.dataNodeService.contractReady.subscribe((contractReady) => {
      this.contractReady = contractReady;
      this.loadTransactions();
    });

  }


  async loadTransactions() {
    if (this.contractReady) {
      const nextIndex = await this.dataNodeService.getNextIndex();

      if (nextIndex === 1) {
        return;
      }

      let fromIndex = nextIndex - 20;
      if (fromIndex < 1) {
        fromIndex = 1;
      }

      const toIndex = nextIndex;
      const indices = Array.from({length: toIndex - fromIndex}, (v, i) => i + fromIndex);

      this.dataBlocks = await this.dataNodeService.getPastEventsWithIndicesAndSenderAddress(indices, null);
    }
  }


}
