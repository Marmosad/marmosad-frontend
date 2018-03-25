import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCoreComponent } from './board-core.component';

describe('BoardCoreComponent', () => {
  let component: BoardCoreComponent;
  let fixture: ComponentFixture<BoardCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
