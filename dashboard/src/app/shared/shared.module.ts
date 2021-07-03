import { NgModule } from '@angular/core';
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
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbAccordionModule
  ],
  declarations: [
    HeaderComponent,
    DrawerSidesheetComponent,
    MobileDrawerComponent,
    SidePanelNavbarComponent,
    BreadcrumbsComponent
  ],
  exports: [
    HeaderComponent,
    DrawerSidesheetComponent,
    MobileDrawerComponent,
    SidePanelNavbarComponent,
    BreadcrumbsComponent
  ]
})
export class SharedModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
