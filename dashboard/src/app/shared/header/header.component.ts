import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navigationList = ['Fleet', 'Work', 'Statistics'];
  isAccountOptionsOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  openAccountOptions(): void{
    if(this.isAccountOptionsOpen){
      this.isAccountOptionsOpen = false;
    }
    else{
      this.isAccountOptionsOpen = true;
    }
  }

}
