import {Component} from '@angular/core';
import {FileSystemFileEntry, UploadEvent} from "ngx-file-drop";
import * as fileType from "file-type";
import {MetaInformationModel} from "../../models/meta-information.model";

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent {

  data: string;
  dataBlob: Blob;
  metaInformations:MetaInformationModel;

  constructor() {
    this.metaInformations = new MetaInformationModel();
  }

  public dropped(event: UploadEvent) {

    const droppedFile = event.files[0];
    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        this.dataBlob = file;
        this.setMimeType();
      });
    }
  }

  private setMimeType() {
    let mimeType = this.dataBlob.type;
    this.metaInformations.createOrUpdateKeyValue({key: 'type', value: mimeType});

    if (!mimeType) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as ArrayBuffer;
        const fileTypeResult = fileType(new Uint8Array(result));
        if(fileTypeResult){
          this.metaInformations.createOrUpdateKeyValue({key: 'type', value: fileTypeResult.mime});
        }
      };
      reader.readAsArrayBuffer(this.dataBlob);
    }
  }
}
