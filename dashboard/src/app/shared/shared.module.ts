import { NgModule, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { DrawerSidesheetComponent } from './drawer-sidesheet/drawer-sidesheet.component';
import { MobileDrawerComponent } from './mobile-drawer/mobile-drawer.component';
import { SidePanelNavbarComponent } from './side-panel-navbar/side-panel-navbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbAccordionModule, NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MobileSidesheetComponent } from './mobile-sidesheet/mobile-sidesheet.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbAccordionModule,
    NgbDropdownModule
  ],
  declarations: [
    HeaderComponent,
    DrawerSidesheetComponent,
    MobileDrawerComponent,
    SidePanelNavbarComponent,
    BreadcrumbsComponent,
    MobileSidesheetComponent
  ],
  exports: [
    HeaderComponent,
    DrawerSidesheetComponent,
    MobileDrawerComponent,
    SidePanelNavbarComponent,
    BreadcrumbsComponent,
    MobileSidesheetComponent
  ],
  providers: [
    NgbDropdown,
    QueryList
  ]
})
export class SharedModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
