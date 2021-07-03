import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { NavOptionsListstate } from "./sitewide-configuration.interface";
import { SiteWideConfigurationStore } from "./sitewide-configuration.store";

@Injectable({ providedIn: 'root' })
export class SiteWideConfigurationQuery extends Query<NavOptionsListstate>{
    constructor(protected store: SiteWideConfigurationStore) {
        super(store);
    }
}