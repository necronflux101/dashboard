import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from 'rxjs/operators';
import { SiteWideConfigurationStore } from "./sitewide-configuration.store";

@Injectable({ providedIn: 'root' })
export class SiteWideConfigurationService {

    private subject = new Subject<any>();
    private activeModule = new Subject<any>();
    private activeSubModule = new Subject<any>();
    private breadCrumbList = new Subject<any>();
    private renderTarget = new Subject<any>();
    private sideMenuDrawerMobile = new Subject<any>();
    private sideSheetMobile = new Subject<any>();

    constructor(
        private http: HttpClient,
        private sitewideConfigStore: SiteWideConfigurationStore
    ) {

    }

    // Service Call
    sendData(data: any): void {
        this.subject.next(data);
    }

    getData(): Observable<any> {
        return this.subject.asObservable();
    }

    // Active Header Module
    updateActiveModule(data: any): void {
        this.activeModule.next(data);
    }

    getActiveModule(): Observable<any> {
        return this.activeModule.asObservable();
    }

    // Active Side Nav Module
    updateActiveSubModule(data: any): void {
        this.activeSubModule.next(data);
    }

    getActiveSubModule(): Observable<any> {
        return this.activeSubModule.asObservable();
    }

    // BreadCrumbs State 
    updateBreadCrumbs(data: any): void {
        this.breadCrumbList.next(data);
    }

    getBreadCrumbs(): Observable<any> {
        return this.breadCrumbList.asObservable();
    }

    // Dynamic Component Render Target
    updateRenderTarget(data: string): void {
        this.renderTarget.next(data);
    }

    getRenderTarget(): Observable<string> {
        return this.renderTarget.asObservable();
    }

    // Mobile Side Panel Draerr
    updateSidePanelDrawerState(data: boolean): void {
        this.sideMenuDrawerMobile.next(data);
    }

    getSidePanelDrawerState(): Observable<boolean> {
        return this.sideMenuDrawerMobile.asObservable();
    }

    // Mobile Side Sheet
    updateSidePanelSheetState(data: boolean): void {
        this.sideSheetMobile.next(data);
    }

    getSidePanelSheetState(): Observable<boolean> {
        return this.sideSheetMobile.asObservable();
    }

    // Service Call
    getNavSectionData(): any {
        const apiUrl = '../../../assets/mock/mock-navigation-options.json';
        return this.http.get<any>(apiUrl).pipe(
            tap((response) => this.parseNavSectionResponse(response))
        );
    }

    parseNavSectionResponse(response: any): void {
        const data = {
            navOptions: response
        };
        this.sitewideConfigStore.update(data);
        this.sendData(true);
    }
}