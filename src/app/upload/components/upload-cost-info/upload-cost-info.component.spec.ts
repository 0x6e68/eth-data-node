import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCostInfoComponent } from './upload-cost-info.component';

describe('UploadCostInfoComponent', () => {
  let component: UploadCostInfoComponent;
  let fixture: ComponentFixture<UploadCostInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCostInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCostInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
