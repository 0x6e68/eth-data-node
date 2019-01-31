import {Component, Input} from '@angular/core';
import {hexToString} from "web3-utils";

@Component({
  selector: 'app-item-string-data',
  templateUrl: './item-string-data.component.html',
  styleUrls: ['./item-string-data.component.scss']
})
export class ItemStringDataComponent {

  private utf8Decoder = new TextDecoder('utf8');

  @Input()
  data: Uint8Array;

  getString(): string{
    return this.utf8Decoder.decode(this.data);
  }
}
