import { Component, OnInit } from '@angular/core';
import { SiteWideConfigurationService } from '../state/sitewide-configuration/sitewide-configuration.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  constructor(
    private sitewideConfigService: SiteWideConfigurationService
  ) { }

  ngOnInit(): void {
    this.getNavSectionDataServiceCall();
  }

  getNavSectionDataServiceCall(): void {
    this.sitewideConfigService.getNavSectionData().subscribe();
  }

}
