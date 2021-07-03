import { Component, OnInit } from '@angular/core';
import { SiteWideConfigurationService } from 'src/app/state/sitewide-configuration/sitewide-configuration.service';

@Component({
  selector: 'app-side-panel-navbar',
  templateUrl: './side-panel-navbar.component.html',
  styleUrls: ['./side-panel-navbar.component.scss']
})
export class SidePanelNavbarComponent implements OnInit {

  optionList: any = [];
  constructor(
    public sitewideConfigService: SiteWideConfigurationService
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
    })
  }
}
