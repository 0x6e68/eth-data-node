import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCostInfoComponent } from './transaction-cost-info.component';

describe('TransactionCostInfoComponent', () => {
  let component: TransactionCostInfoComponent;
  let fixture: ComponentFixture<TransactionCostInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionCostInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCostInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
