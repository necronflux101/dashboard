import { Component, OnInit } from '@angular/core';
import { SiteWideConfigurationQuery } from 'src/app/state/sitewide-configuration/sitewide-configuration.query';
import { SiteWideConfigurationService } from 'src/app/state/sitewide-configuration/sitewide-configuration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navigationList: Array<any> = [];
  isAccountOptionsOpen = false;
  homeOptions = null;

  constructor(
    private sitewideConfigService: SiteWideConfigurationService,
    private sitewideConfigQuery: SiteWideConfigurationQuery
  ) { }

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
          }
          else {
            this.navigationList.push(navItem);
          }
        });
        console.log('list', this.navigationList);
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
    console.log('selected', moduleData);
    this.sitewideConfigService.updateActiveModule(moduleData);
  }
}
