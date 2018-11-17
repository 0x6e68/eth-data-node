import {Component} from '@angular/core';
import {DataNodeService} from "../services/data-node.service";
import {Web3Service} from "../services/web3.service";
import {FileSystemFileEntry, UploadEvent} from "ngx-file-drop";
import { compress } from 'wasm-brotli';

@Component({
  selector: 'app-upload-file-form',
  templateUrl: './upload-file-form.component.html',
})
export class UploadFileComponent {

  constructor(private messageService: DataNodeService, private web3Service: Web3Service) {
  }

  public dropped(event: UploadEvent) {
    for (const droppedFile of event.files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          const reader = new FileReader();

          reader.onload = (event) => {
            const metaData = {
              type: file.type
            };

            const result = reader.result as ArrayBuffer;
            this.postData(result,metaData);

          };
          reader.readAsArrayBuffer(file);

        });
      }
    }
  }

  private async postData(result: ArrayBuffer, metaData:Object){
   // const compressedResult = await compress(new Uint8Array(result));


    // console.log("org:",result.byteLength, "brotli:",compressedResult.byteLength);
    this.messageService.postDataTransaction(result, metaData);
  }

  public fileOver(event) {
  }

  public fileLeave(event) {
  }

}
