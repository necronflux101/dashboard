import { Component, OnInit } from '@angular/core';
import { BreadcrumbsQuery } from 'src/app/state/breadcrumbs/breadcrumbs.query';
import { BreadCrumbsService } from 'src/app/state/breadcrumbs/breadcrumbs.service';
import { SiteWideConfigurationService } from 'src/app/state/sitewide-configuration/sitewide-configuration.service';

@Component({
  selector: 'app-side-panel-navbar',
  templateUrl: './side-panel-navbar.component.html',
  styleUrls: ['./side-panel-navbar.component.scss']
})
export class SidePanelNavbarComponent implements OnInit {

  optionList: any = [];
  constructor(
    public sitewideConfigService: SiteWideConfigurationService,
    private breadCrumbsService: BreadCrumbsService,
    public breadCrumbsQuery: BreadcrumbsQuery
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.sitewideConfigService.getActiveModule().subscribe((moduleData) => {
      this.optionList = [];
      console.log(moduleData);
      moduleData?.child_modules?.forEach((element: any) => {
        this.optionList.push(element);
      });
      console.log(this.optionList);
    });
  }

  selectModule(moduleData: any): void {
    console.log('selected', moduleData);
    this.setBreadCrumbs(moduleData);
    this.sitewideConfigService.updateActiveSubModule(moduleData);
  }

  setBreadCrumbs(moduleData: any): void {
    let breadcrumbspath = [];
    breadcrumbspath = this.breadCrumbsQuery.getValue().paths;
    breadcrumbspath = breadcrumbspath.splice(0,1);
    breadcrumbspath.push(moduleData?.title)
    breadcrumbspath.push(moduleData?.child_modules[0]?.title);
    //breadcrumbspath.push(moduleData?.child_modules[0]?.child_modules[0]?.title);
    if (moduleData?.child_modules[0]?.list.length > 0) {
      breadcrumbspath.push(moduleData?.child_modules[0]?.list[0]?.title);
    } console.log('Set Breadcrumbs: ', breadcrumbspath);
    this.sitewideConfigService.updateBreadCrumbs(breadcrumbspath);
    this.breadCrumbsService.updateBreadCrumbsState(breadcrumbspath);
  }


}
