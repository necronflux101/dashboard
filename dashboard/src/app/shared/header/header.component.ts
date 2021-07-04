import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { BreadCrumbsService } from 'src/app/state/breadcrumbs/breadcrumbs.service';
import { SiteWideConfigurationQuery } from 'src/app/state/sitewide-configuration/sitewide-configuration.query';
import { SiteWideConfigurationService } from 'src/app/state/sitewide-configuration/sitewide-configuration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChildren(NgbDropdown)
  dropdowns: QueryList<NgbDropdown>;
  dropdown: NgbDropdown;

  navigationList: Array<any> = [];
  isAccountOptionsOpen = false;
  homeOptions = null;

  constructor(
    private sitewideConfigService: SiteWideConfigurationService,
    private sitewideConfigQuery: SiteWideConfigurationQuery,
    private breadCrumbsService: BreadCrumbsService,
    private dropDown: NgbDropdown,
    private dropDowns: QueryList<NgbDropdown>
  ) {
    this.dropdown = dropDown;
    this.dropdowns = dropDowns;
  }

  ngOnInit(): void {
    this.getNavOptions();
  }

  getNavOptions() {
    this.sitewideConfigService.getData().subscribe((isLoaded) => {
      if (isLoaded) {
        this.navigationList = [];
        this.sitewideConfigQuery.getValue().navOptions.forEach((navItem) => {
          if (navItem?.module_name === 'Home') {
            this.homeOptions = navItem;
            // Setting Default to Home Dashboard
            this.selectModule(this.homeOptions);
            this.sitewideConfigService.updateActiveSubModule(navItem?.child_modules[0]);
            this.setBreadCrumbs(this.homeOptions);
          }
          else {
            this.navigationList.push(navItem);
          }
        });
      }
    })
  }

  openAccountOptions(): void {
    if (this.isAccountOptionsOpen) {
      this.isAccountOptionsOpen = false;
    }
    else {
      this.isAccountOptionsOpen = true;
    }
  }

  selectModule(moduleData: any): void {
    this.setBreadCrumbs(moduleData);
    this.sitewideConfigService.updateActiveModule(moduleData);
    this.sitewideConfigService.updateActiveSubModule(moduleData?.child_modules[0]);

    // Set Session Storage For Mobile View
    if (typeof window !== 'undefined') { // For SSR Browser Check
      sessionStorage.setItem('selectedSideNavModule', JSON.stringify(moduleData));
    }
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

  // Mobile View
  toggleMobileMenu(): void {
    // Open Side Panel Menu on Mobile
    this.sitewideConfigService.updateSidePanelDrawerState(true);
  }

  checkDropDown(dropdown: any): boolean {
    const dropdowns = this.dropdowns.find(x => (x as any)._elementRef.nativeElement == dropdown);
    if (dropdowns) {
      this.dropdown = dropdowns;
      // Check if the clicked dropdown is open
      return this.dropdown.isOpen();
    }
    return false;
  }

  onDropDownOptionClick(option: any){
    switch(option){
      case 'bright':
        if(typeof window !== 'undefined'){
          sessionStorage.setItem('theme', 'normal');
        }
        break;

      case 'dark':
        if(typeof window !== 'undefined'){
          sessionStorage.setItem('theme', 'dark');
        }
        break;

      case 'signout':
        if(typeof window !== 'undefined'){
          window.alert('Signing User Out');
        } 
        break;
    }
  }
}
