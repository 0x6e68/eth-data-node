import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TransactionListComponent} from "./transaction-list/transaction-list.component";
import {DataNodeService} from "./services/data-node.service";
import {Web3Service} from "./services/web3.service";
import {ItemStringDataComponent} from "./transaction-list-item/item-data/string/item-string-data.component";
import {ItemBlobDataComponent} from "./transaction-list-item/item-data/download/item-blob-data.component";
import {TransactionListItem} from "./transaction-list-item/transaction-list-item.component";
import {FileDropModule} from "ngx-file-drop";
import {ItemImageDataComponent} from "./transaction-list-item/item-data/image/item-image-data.component";
import {MessageInputComponent} from './upload/components/message-input/message-input.component';
import {UploadCostInfoComponent} from './upload/components/upload-cost-info/upload-cost-info.component';
import {TransactionCostInfoComponent} from './upload/components/transaction-cost-info/transaction-cost-info.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { FileInputComponent } from './upload/components/file-input/file-input.component';
import { UploadButtonComponent } from './upload/components/upload-button/upload-button.component';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from "@angular/material";
import { NoEthBrowserComponent } from './no-eth-browser/no-eth-browser.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    ItemStringDataComponent,
    ItemImageDataComponent,
    ItemBlobDataComponent,
    TransactionListItem,
    MessageInputComponent,
    UploadCostInfoComponent,
    TransactionCostInfoComponent,
    FileInputComponent,
    UploadButtonComponent,
    NoEthBrowserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FileDropModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [
    DataNodeService,
    Web3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
