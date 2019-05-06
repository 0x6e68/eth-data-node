import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms";


export interface KeyValue {
  key: string,
  value: string
}

export interface GroupAndIndex {
  group: AbstractControl,
  index: number
}

export class MetaInformationModel {

  private metaInformation: FormArray;

  private addedEmptyControl: boolean;

  constructor() {
    this.metaInformation = new FormArray([]);
    this.initEmptyKeyValueGroup();
  }

  private initEmptyKeyValueGroup() {
    this.createOrUpdateKeyValue({key: '', value: ''});

    this.metaInformation.valueChanges.subscribe(() => {
      this.addEmptyControlIfNotAlreayPresent();
    });
  }

  private addEmptyControlIfNotAlreayPresent(){
    if(this.addedEmptyControl){
      this.addedEmptyControl = false;
      return;
    }

    if (!this.getGroupOfKey('')) {
      this.addedEmptyControl = true;
      this.metaInformation.insert(0, new FormGroup({
        key: new FormControl(''),
        value: new FormControl(''),
      },));
    }
  }

  private pushNewKeyValueGroup(keyValue: KeyValue) {
    this.metaInformation.push(new FormGroup({
      key: new FormControl(keyValue.key),
      value: new FormControl(keyValue.value),
    }));
  }

  private patchGroupWithKeyValue(keyValue: KeyValue, groupOfKey: AbstractControl) {
    groupOfKey.get('key').patchValue(keyValue.key);
    groupOfKey.get('value').patchValue(keyValue.value);
  }

  private getGroupAndIndexOfKey(key: string): GroupAndIndex {
    for (let i = 0; i < this.metaInformation.length; i++) {
      const metaInformationGroup: AbstractControl = this.metaInformation.at(i);

      if (metaInformationGroup.get('key').value === key) {
        return {
          'group': metaInformationGroup,
          'index': i
        };
      }
    }
  }

  private getGroupOfKey(key: string): AbstractControl {
    const controlAndIndex = this.getGroupAndIndexOfKey(key);
    if (controlAndIndex) {
      return controlAndIndex.group;
    }
  }

  getFormArray(): FormArray {
    return this.metaInformation;
  }

  createOrUpdateKeyValue(keyValue: KeyValue) {
    const groupOfKey = this.getGroupOfKey(keyValue.key);
    if (groupOfKey) {
      this.patchGroupWithKeyValue(keyValue, groupOfKey)
    } else {
      this.pushNewKeyValueGroup(keyValue);
    }
  }

  removeKey(key: string) {
    const groupAndIndex = this.getGroupAndIndexOfKey(key);
    if (groupAndIndex) {
      this.metaInformation.removeAt(groupAndIndex.index);
    }
  }

  removeAtIndex(index: number){
    this.metaInformation.removeAt(index);
  }

  getMetaInformationObject(): Object {
    const metaInformationObject: Object = {};

    for (let i = 0; i < this.metaInformation.length; i++) {
      const keyValueGroup: AbstractControl = this.metaInformation.at(i);
      if (keyValueGroup.get('key').value !== '') {
        metaInformationObject[keyValueGroup.get('key').value] = keyValueGroup.get('value').value;
      }
    }

    return metaInformationObject;
  }


}
