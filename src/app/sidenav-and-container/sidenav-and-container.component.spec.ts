import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavAndContainerComponent } from './sidenav-and-container.component';

describe('SidenavAndContainerComponent', () => {
  let component: SidenavAndContainerComponent;
  let fixture: ComponentFixture<SidenavAndContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavAndContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavAndContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
