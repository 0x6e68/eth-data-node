import {Injectable} from '@angular/core';
import * as fileType from 'file-type';

@Injectable({
  providedIn: 'root'
})
export class MimeTypeLookupService {

  lookupMimeTypeFromBlob(dataBlob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as ArrayBuffer;
        const fileTypeResult = fileType(new Uint8Array(result));
        if (fileTypeResult) {
          resolve(fileTypeResult.mime);
        } else {
          resolve();
        }
      };
      reader.readAsArrayBuffer(dataBlob);
    });
  }

  lookupMimeTypeFromUint8Array(data: Uint8Array) {
    const fileTypeResult = fileType(data);
    if (fileTypeResult) {
      return fileTypeResult.mime;
    }
  }
}
