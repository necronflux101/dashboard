import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbsQuery } from 'src/app/state/breadcrumbs/breadcrumbs.query';
import { BreadCrumbsService } from 'src/app/state/breadcrumbs/breadcrumbs.service';
import { SiteWideConfigurationQuery } from 'src/app/state/sitewide-configuration/sitewide-configuration.query';
import { SiteWideConfigurationService } from 'src/app/state/sitewide-configuration/sitewide-configuration.service';

@Component({
  selector: 'app-mobile-drawer',
  templateUrl: './mobile-drawer.component.html',
  styleUrls: ['./mobile-drawer.component.scss']
})
export class MobileDrawerComponent implements OnInit {

  displaySheet = false;
  navigationList: Array<any> = [];
  homeOptions = null;

  constructor(
    private sitewideConfigService: SiteWideConfigurationService,
    private breadCrumbsService: BreadCrumbsService,
    private breadCrumbsQuery: BreadcrumbsQuery,
    private sitewideConfigQuery: SiteWideConfigurationQuery
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.displaySheet = true;
      this.getNavOptions();
    }, 50);
  }

  getNavOptions() {
    this.navigationList = [];
    this.sitewideConfigQuery.getValue().navOptions.forEach((navItem) => {
      this.navigationList.push(navItem);
    });
  }

  selectModule(moduleData: any): void {
    this.setBreadCrumbs(moduleData);
    this.sitewideConfigService.updateActiveModule(moduleData);
    this.sitewideConfigService.updateActiveSubModule(moduleData?.child_modules[0]);
    // Set Session Storage For Mobile View
    if(typeof window !== 'undefined'){ // For SSR Browser Check
      sessionStorage.setItem('selectedSideNavModule', JSON.stringify(moduleData));
    }

    this.closeDrawer();
  }

  setBreadCrumbs(moduleData: any): void {
    const breadcrumbspath = [];
    breadcrumbspath.push(moduleData.module_name)
    breadcrumbspath.push(moduleData?.child_modules[0]?.title);
    breadcrumbspath.push(moduleData?.child_modules[0]?.child_modules[0]?.title);
    if (moduleData?.child_modules[0]?.child_modules[0]?.list.length > 0) {
      breadcrumbspath.push(moduleData?.child_modules[0]?.child_modules[0]?.list[0]?.title);
    }
    this.breadCrumbsService.updateBreadCrumbsState(breadcrumbspath);
    this.sitewideConfigService.updateBreadCrumbs(breadcrumbspath);
  }

  onClick(event: any) {
    if (event.target.className.includes('mobile-drawer-container')) {
      this.closeDrawer();
    }
  }

  closeDrawer() {
    this.displaySheet = false;
    setTimeout(() => {
      this.sitewideConfigService.updateSidePanelDrawerState(false);
    }, 310);
  }

}
