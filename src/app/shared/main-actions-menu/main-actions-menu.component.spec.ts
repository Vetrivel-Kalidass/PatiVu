import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainActionsMenuComponent } from './main-actions-menu.component';

describe('MainActionsMenuComponent', () => {
  let component: MainActionsMenuComponent;
  let fixture: ComponentFixture<MainActionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainActionsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainActionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
