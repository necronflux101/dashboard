import { Component, OnInit } from '@angular/core';
import { BreadcrumbsQuery } from 'src/app/state/breadcrumbs/breadcrumbs.query';
import { BreadCrumbsService } from 'src/app/state/breadcrumbs/breadcrumbs.service';
import { SiteWideConfigurationQuery } from 'src/app/state/sitewide-configuration/sitewide-configuration.query';
import { SiteWideConfigurationService } from 'src/app/state/sitewide-configuration/sitewide-configuration.service';

@Component({
  selector: 'app-drawer-sidesheet',
  templateUrl: './drawer-sidesheet.component.html',
  styleUrls: ['./drawer-sidesheet.component.scss']
})
export class DrawerSidesheetComponent implements OnInit {

  optionList: any = [];
  title: any = [];
  originalBreadCrumblist: any = [];

  constructor(
    private sitewideConfigService: SiteWideConfigurationService,
    private sitewideConfigQuery: SiteWideConfigurationQuery,
    private breadCrumbsQuery: BreadcrumbsQuery,
    private breadCrumbsService: BreadCrumbsService
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.sitewideConfigService.getActiveSubModule().subscribe((moduleData) => {
      this.title = moduleData?.title;
      this.optionList = [];
      console.log(moduleData);
      moduleData?.child_modules?.forEach((element: any) => {
        this.optionList.push(element);
      });
      console.log(this.optionList);
      this.originalBreadCrumblist = this.breadCrumbsQuery.getValue().paths;
      console.log('Original Path Updated: ', this.originalBreadCrumblist);
    });

  }

  selectedOption(moduleData: any, listItem?: any): void {
    console.log('Selected Option: ', moduleData);
    if (listItem) {
      this.setBreadCrumbs(moduleData, listItem);
    }
    else {
      this.setBreadCrumbs(moduleData);
    }
  }

  setBreadCrumbs(moduleData: any, listItem?: any): void {
    console.log('Original List', this.originalBreadCrumblist);
    let breadcrumbspath = [];
    breadcrumbspath = this.breadCrumbsQuery.getValue().paths;
    if(breadcrumbspath.length <= 2){
      breadcrumbspath = this.originalBreadCrumblist.slice(0,2);
      console.log('Slice Breadcrumbs:',breadcrumbspath);
    }
    // Re create Full Original Path
    //if (this.breadCrumbsQuery.getValue().paths.length >= 2) {

      breadcrumbspath = breadcrumbspath.slice(0,2);
      breadcrumbspath.push(moduleData?.title);
      if (listItem) {
        breadcrumbspath.push(listItem.title);
      }
      console.log('Set Breadcrumbs: ', breadcrumbspath);
    //}
    this.sitewideConfigService.updateBreadCrumbs(breadcrumbspath);
    this.breadCrumbsService.updateBreadCrumbsState(breadcrumbspath);
    // }
  }


}
