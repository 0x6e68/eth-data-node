import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-item-blob-data',
  templateUrl: './item-blob-data.component.html',
})
export class ItemBlobDataComponent implements OnInit{

  constructor(private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.blob = new Blob([this.data], { type: this.dataType });
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.blob));
  }

  @Input()
  data: Uint8Array;

  @Input()
  dataType: string;

  private blob: Blob;

  url: SafeResourceUrl;

}
