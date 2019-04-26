import {Component, Input} from '@angular/core';
import {DataTransactionModel} from "../../../models/data-transaction.model";
import {MimeTypeLookupService} from '../../../mime-type-lookup.service';

@Component({
  selector: 'app-transaction-list-item',
  templateUrl: './transaction-list-item.component.html',
  styleUrls: ['./transaction-list-item.component.scss']
})
export class TransactionListItem {

  @Input()
  dataBlock: DataTransactionModel;

  constructor(private mimeTypeLookupService: MimeTypeLookupService){}

  isText(): boolean{
    return this.getDataType() === 'text/plain';
  }

  isImage(): boolean{
    return this.getDataType().includes('image/');
  }

  getDataType(): string{
    if(this.dataBlock.metaData && this.dataBlock.metaData['type']){
      return this.dataBlock.metaData['type'];
    }

    return this.mimeTypeLookupService.lookupMimeTypeFromUint8Array(this.dataBlock.data) || 'unkown type';
  }

  getTitle(): string{
    if(this.dataBlock.metaData && this.dataBlock.metaData['title']){
      return this.dataBlock.metaData['title'];
    }

    return 'No Title';
  }

  getEtherScanAddressHref(address: string){
    return  "https://etherscan.io/address/" + address;
  }

}
