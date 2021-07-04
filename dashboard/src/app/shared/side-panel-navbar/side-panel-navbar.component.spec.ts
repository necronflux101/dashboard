import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelNavbarComponent } from './side-panel-navbar.component';

describe('SidePanelNavbarComponent', () => {
  let component: SidePanelNavbarComponent;
  let fixture: ComponentFixture<SidePanelNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidePanelNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
