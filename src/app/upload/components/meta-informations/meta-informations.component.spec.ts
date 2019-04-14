import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaInformationsComponent } from './meta-informations.component';

describe('MetaInformationsComponent', () => {
  let component: MetaInformationsComponent;
  let fixture: ComponentFixture<MetaInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
