import {Component, Input} from '@angular/core';
import {DataTransactionModel} from "../../../models/data-transaction.model";

@Component({
  selector: 'app-transaction-list-item',
  templateUrl: './transaction-list-item.component.html',
})
export class TransactionListItem {

  @Input()
  dataBlock: DataTransactionModel;

  isText(): boolean{
    return this.getDataType() === 'text/plain';
  }

  isImage(): boolean{
    return this.getDataType().includes('image/');
  }

  getDataType(): string{
    if(this.dataBlock.metaData){
      return this.dataBlock.metaData['type'];
    }
  }

  getTitle(): string{
    if(this.dataBlock.metaData){
      return this.dataBlock.metaData['title'];
    }
  }

}
