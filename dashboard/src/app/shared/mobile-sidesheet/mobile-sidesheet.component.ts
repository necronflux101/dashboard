import { Component, OnInit } from '@angular/core';
import { BreadcrumbsQuery } from 'src/app/state/breadcrumbs/breadcrumbs.query';
import { BreadCrumbsService } from 'src/app/state/breadcrumbs/breadcrumbs.service';
import { SiteWideConfigurationQuery } from 'src/app/state/sitewide-configuration/sitewide-configuration.query';
import { SiteWideConfigurationService } from 'src/app/state/sitewide-configuration/sitewide-configuration.service';

@Component({
  selector: 'app-mobile-sidesheet',
  templateUrl: './mobile-sidesheet.component.html',
  styleUrls: ['./mobile-sidesheet.component.scss']
})
export class MobileSidesheetComponent implements OnInit {

  displaySheet = false;

  // Side Sheet
  optionList: any = [];
  title: any = [];
  originalBreadCrumblist: any = [];

  // Side Nav BAr
  sideNavOptionList: any = [];

  constructor(
    private sitewideConfigService: SiteWideConfigurationService,
    private breadCrumbsService: BreadCrumbsService,
    private breadCrumbsQuery: BreadcrumbsQuery,
    private sitewideConfigQuery: SiteWideConfigurationQuery
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.displaySheet = true;
      //this.getNavOptions();
    }, 50);
    this.initData();
  }

  onClick(event: any) {
    if (event.target.className.includes('sidesheet show')) {
      this.closeDrawer();
    }
  }

  closeDrawer() {
    this.displaySheet = false;
    setTimeout(() => {
      this.sitewideConfigService.updateSidePanelSheetState(false);
    }, 310);
  }

  initData() {
    let sideNavOptionSelected = null
    if (typeof window !== 'undefined') {
      sideNavOptionSelected = sessionStorage.getItem('selectedSideNavModule');
    }
    if (sideNavOptionSelected) {
      sideNavOptionSelected = JSON.parse(sideNavOptionSelected);
      this.sideNavOptionList = [];
      sideNavOptionSelected?.child_modules?.forEach((element: any) => {
        this.sideNavOptionList.push(element);
      });
    }

    this.sitewideConfigService.getActiveSubModule().subscribe((moduleData) => {
      this.title = moduleData?.title;
      this.optionList = [];
      moduleData?.child_modules?.forEach((element: any) => {
        this.optionList.push(element);
      });
      this.originalBreadCrumblist = this.breadCrumbsQuery.getValue().paths;
    });

    // Initialize Side Sheet for first Selection
    this.sitewideConfigService.updateActiveSubModule(this.sideNavOptionList[0]);

  }

  // Side Panel
  selectModule(moduleData: any): void {
    this.setBreadCrumbsOnMobileSidePanel(moduleData);
    this.sitewideConfigService.updateActiveSubModule(moduleData);
  }

  setBreadCrumbsOnMobileSidePanel(moduleData: any): void {
    let breadcrumbspath = [];
    breadcrumbspath = this.breadCrumbsQuery.getValue().paths;
    breadcrumbspath = breadcrumbspath.splice(0, 1);
    breadcrumbspath.push(moduleData?.title)
    breadcrumbspath.push(moduleData?.child_modules[0]?.title);
    //breadcrumbspath.push(moduleData?.child_modules[0]?.child_modules[0]?.title);
    if (moduleData?.child_modules[0]?.list.length > 0) {
      breadcrumbspath.push(moduleData?.child_modules[0]?.list[0]?.title);
    }
    this.sitewideConfigService.updateBreadCrumbs(breadcrumbspath);
    this.breadCrumbsService.updateBreadCrumbsState(breadcrumbspath);
  }

  // Side Sheet
  selectedOption(moduleData: any, listItem?: any): void {
    if (listItem) {
      this.setBreadCrumbs(moduleData, listItem);
    }
    else {
      this.setBreadCrumbs(moduleData);
    }
    this.closeDrawer();
  }

  setBreadCrumbs(moduleData: any, listItem?: any): void {
    let breadcrumbspath = [];
    breadcrumbspath = this.breadCrumbsQuery.getValue().paths;
    if (breadcrumbspath.length <= 2) {
      breadcrumbspath = this.originalBreadCrumblist.slice(0, 2);
    }

    breadcrumbspath = breadcrumbspath.slice(0, 2);
    breadcrumbspath.push(moduleData?.title);
    if (listItem) {
      breadcrumbspath.push(listItem.title);
    }
    this.sitewideConfigService.updateBreadCrumbs(breadcrumbspath);
    this.breadCrumbsService.updateBreadCrumbsState(breadcrumbspath);
  }

}
