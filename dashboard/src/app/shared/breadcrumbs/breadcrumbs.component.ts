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
      this.onSelection(this.pathList[this.pathList.length - 1], this.pathList.length - 1);
    });
  }

  onSelection(selected: any, index: any) {
    let routeTarget = '';
    // TODO: More paths can be maintained and point for exclusion using service 
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

  checkCurrentTheme(): string | null {
    if (typeof window !== 'undefined') {
      const theme = sessionStorage.getItem('theme');
      return theme;
    }
    return ''
  }
}
