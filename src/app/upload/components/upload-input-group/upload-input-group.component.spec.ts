import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadInputGroupComponent } from './upload-input-group.component';

describe('UploadInputGroupComponent', () => {
  let component: UploadInputGroupComponent;
  let fixture: ComponentFixture<UploadInputGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadInputGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadInputGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
