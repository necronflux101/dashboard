import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { NavOptionsListstate } from "./sitewide-configuration.interface";

export function createInitialState(): NavOptionsListstate {
    return {
        navOptions: []
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'siteConfig' })
export class SiteWideConfigurationStore extends Store<NavOptionsListstate>{
    constructor() {
        super(createInitialState());
    }

    resetState(): void {
        this.update(createInitialState());
    }
}