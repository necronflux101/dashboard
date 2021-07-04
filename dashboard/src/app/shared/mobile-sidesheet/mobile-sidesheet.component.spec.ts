import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSidesheetComponent } from './mobile-sidesheet.component';

describe('MobileSidesheetComponent', () => {
  let component: MobileSidesheetComponent;
  let fixture: ComponentFixture<MobileSidesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileSidesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSidesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
