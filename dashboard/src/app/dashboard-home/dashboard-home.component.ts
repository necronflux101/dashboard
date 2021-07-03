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
  }

  getNavSectionDataServiceCall(): void {
    this.sitewideConfigService.getNavSectionData().subscribe();
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

}
