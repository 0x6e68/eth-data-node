import {Component} from '@angular/core';
import {FileSystemFileEntry, UploadEvent} from 'ngx-file-drop';
import {MetaInformationModel} from '../../models/meta-information.model';
import {MimeTypeLookupService} from '../../../mime-type-lookup.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent {

  data: string;
  dataBlob: Blob;
  metaInformations:MetaInformationModel;

  constructor(private mimeTypeLookupService:MimeTypeLookupService) {
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
      this.mimeTypeLookupService.lookupMimeTypeFromBlob(this.dataBlob).then(type => {
        this.metaInformations.createOrUpdateKeyValue({key: 'type', value: type});
      });
    }
  }
}
