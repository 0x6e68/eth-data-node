import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAddressConfigComponent } from './contract-address-config.component';

describe('ContractAddressConfigComponent', () => {
  let component: ContractAddressConfigComponent;
  let fixture: ComponentFixture<ContractAddressConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractAddressConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAddressConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
