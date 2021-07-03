import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from 'rxjs/operators';
import { SiteWideConfigurationStore } from "./sitewide-configuration.store";

@Injectable({ providedIn: 'root' })
export class SiteWideConfigurationService {

    private subject = new Subject<any>();
    private activeModule = new Subject<any>();

    constructor(
        private http: HttpClient,
        private sitewideConfigStore: SiteWideConfigurationStore
    ) {

    }

    sendData(data: any): void {
        this.subject.next(data);
    }

    getData(): Observable<any> {
        return this.subject.asObservable();
    }

    updateActiveModule(data: any): void {
        this.activeModule.next(data);
    }

    getActiveModule(): Observable<any> {
        return this.activeModule.asObservable();
    }

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