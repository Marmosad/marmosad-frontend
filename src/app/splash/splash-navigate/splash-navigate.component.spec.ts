import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashNavigateComponent } from './splash-navigate.component';

describe('SplashNavigateComponent', () => {
  let component: SplashNavigateComponent;
  let fixture: ComponentFixture<SplashNavigateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashNavigateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
