import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEthBrowserComponent } from './no-eth-browser.component';

describe('NoEthBrowserComponent', () => {
  let component: NoEthBrowserComponent;
  let fixture: ComponentFixture<NoEthBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoEthBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoEthBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
