import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => 
      import('./dashboard-home/dashboard-home.module').then(
        (m) => m.DashboardHomeModule 
      ),
  },
  {
    path: 'home',
    loadChildren: () => 
      import('./dashboard-home/dashboard-home.module').then(
        (m) => m.DashboardHomeModule 
      ),
  },
  {
    path: '**',
    loadChildren: () => 
      import('./dashboard-home/dashboard-home.module').then(
        (m) => m.DashboardHomeModule 
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
