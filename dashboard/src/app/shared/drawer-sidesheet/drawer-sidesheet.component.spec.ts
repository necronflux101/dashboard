import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerSidesheetComponent } from './drawer-sidesheet.component';

describe('DrawerSidesheetComponent', () => {
  let component: DrawerSidesheetComponent;
  let fixture: ComponentFixture<DrawerSidesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerSidesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerSidesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
