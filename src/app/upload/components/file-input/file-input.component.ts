import { Component, OnInit } from '@angular/core';
import {DataNodeService} from "../../../services/data-node.service";
import {Web3Service} from "../../../services/web3.service";
import {FileSystemFileEntry, UploadEvent} from "ngx-file-drop";

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

  data: string;
  dataBlob: Blob;

  constructor(private messageService: DataNodeService, private web3Service: Web3Service) {
  }

  ngOnInit() {
  }

  public dropped(event: UploadEvent) {
    for (const droppedFile of event.files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.dataBlob = file;
        });
      }
    }
  }
}
