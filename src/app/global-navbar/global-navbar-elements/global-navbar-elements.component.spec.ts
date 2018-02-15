import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalNavbarElementsComponent } from './global-navbar-elements.component';

describe('GlobalNavbarElementsComponent', () => {
  let component: GlobalNavbarElementsComponent;
  let fixture: ComponentFixture<GlobalNavbarElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalNavbarElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalNavbarElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
