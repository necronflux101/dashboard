import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { componentsRegistry } from '../common/component.registry';
import { SiteWideConfigurationService } from '../state/sitewide-configuration/sitewide-configuration.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  @ViewChild('custom', { read: ViewContainerRef }) customComponentLoader: ViewContainerRef;

  showMobileSidePanel : boolean = false;
  showMobileSideSheet : boolean = false;

  constructor(
    private sitewideConfigService: SiteWideConfigurationService,
    private containerRef: ViewContainerRef,
    private componentFactory: ComponentFactoryResolver
  ) {
    this.customComponentLoader = containerRef;
  }

  ngOnInit(): void {
    this.getNavSectionDataServiceCall();
    this.loadComponent();
    this.getMobileDrawerState();
    this.getMobileSideSheetState();
  }

  getNavSectionDataServiceCall(): void {
    this.sitewideConfigService.getNavSectionData().subscribe();
  }

  getMobileDrawerState(): void{
    this.sitewideConfigService.getSidePanelDrawerState().subscribe((display) => {
      this.showMobileSidePanel = display;
    })
  }

  getMobileSideSheetState(): void {
    this.sitewideConfigService.getSidePanelSheetState().subscribe((display) => {
      this.showMobileSideSheet = display;
    })
  }

  loadComponent(): void {
    this.sitewideConfigService.getRenderTarget().subscribe((target) => {
      setTimeout(() => {
        const type = target;
        this.customComponentLoader.clear();
        const componentType = componentsRegistry.find((element) => element.type === target)?.component;

        if (componentType) {
          // Create Component and render
          const componentFactory = this.componentFactory.resolveComponentFactory(
            componentType
          );
          const instance = this.customComponentLoader.createComponent(
            componentFactory
          )
        }
      }, 0);
    })
  }

  checkCurrentTheme(): string | null {
    if (typeof window !== 'undefined') {
      const theme = sessionStorage.getItem('theme');
      return theme;
    }
    return ''
  }
}
