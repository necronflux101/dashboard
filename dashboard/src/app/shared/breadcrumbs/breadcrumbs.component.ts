import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadCrumbsService } from 'src/app/state/breadcrumbs/breadcrumbs.service';
import { SiteWideConfigurationService } from 'src/app/state/sitewide-configuration/sitewide-configuration.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  pathList = [];

  constructor(
    private sitewideConfigService: SiteWideConfigurationService,
    private breadCrumbsService: BreadCrumbsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.sitewideConfigService.getBreadCrumbs().subscribe((list) => {
      this.pathList = list;
      console.log('BreadCrumbs list: ', this.pathList);
      this.onSelection(this.pathList[this.pathList.length - 1], this.pathList.length - 1);
    });
  }

  onSelection(selected: any, index: any) {
    console.log('Route to : ', selected, this.pathList[this.pathList.length - 1], index);
    let routeTarget = '';
    // TODO: More paths can be maintain and point for exlusion using service 
    switch (selected) {
      case 'Performance Indicator':
        routeTarget = 'pi';
        break;

      case 'Indicator':
        routeTarget = 'indicator';
        break;

      default:
        routeTarget = 'dashboard'
        break;
    }
    this.pathList = this.pathList.slice(0, index + 1);
    this.breadCrumbsService.updateBreadCrumbsState(this.pathList);
    this.sitewideConfigService.updateRenderTarget(routeTarget);
  }

  onDashToggle() {
    this.sitewideConfigService.updateSidePanelSheetState(true);
  }

}
