import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TransactionListComponent} from "./transaction-list/transaction-list.component";
import {DataNodeService} from "./services/data-node.service";
import {Web3Service} from "./services/web3.service";
import {ItemStringDataComponent} from "./transaction-list-item/item-data/string/item-string-data.component";
import {ItemBlobDataComponent} from "./transaction-list-item/item-data/download/item-blob-data.component";
import {TransactionListItem} from "./transaction-list-item/transaction-list-item.component";
import {UploadFileComponent} from "./upload-file-form/upload-file-form.component";
import {FileDropModule} from "ngx-file-drop";
import {ItemImageDataComponent} from "./transaction-list-item/item-data/image/item-image-data.component";

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    ItemStringDataComponent,
    ItemImageDataComponent,
    ItemBlobDataComponent,
    TransactionListItem,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    FileDropModule,
    AppRoutingModule
  ],
  providers: [
    DataNodeService,
    Web3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
