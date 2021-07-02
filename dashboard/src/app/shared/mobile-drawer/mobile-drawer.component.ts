import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-drawer',
  templateUrl: './mobile-drawer.component.html',
  styleUrls: ['./mobile-drawer.component.scss']
})
export class MobileDrawerComponent implements OnInit, OnDestroy {

  displaySheet = true;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.displaySheet = false;
  }

}
