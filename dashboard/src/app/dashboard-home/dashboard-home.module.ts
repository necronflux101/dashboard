import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './dashboard-home.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardHomeRoutingModule } from './dashboard.routing';


@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardHomeRoutingModule
  ],
  providers: [
  ]
})
export class DashboardHomeModule { }
