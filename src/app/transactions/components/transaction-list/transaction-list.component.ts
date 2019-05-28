import {Component, OnInit} from '@angular/core';
import {DataTransactionModel} from "../../../models/data-transaction.model";
import {DataNodeService} from "../../../services/data-node.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  dataBlocks: DataTransactionModel[] = [];
  private contractReady = false;


  constructor(private dataNodeService: DataNodeService) {
  }

  ngOnInit() {
    this.dataNodeService.contractReady.subscribe((contractReady) => {
      this.contractReady = contractReady;
      this.loadTransactions();

      const eventEmiter = this.dataNodeService.getEventEmiter();
      if(eventEmiter){
        eventEmiter.on('data', (event) => {
          this.loadTransactions();
        });
      }
    });

    this.dataNodeService.loadContractAtAddress(environment.contract.defaultAddress);
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
