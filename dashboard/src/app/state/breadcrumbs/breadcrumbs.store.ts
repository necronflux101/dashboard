import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { BreadCrumbsPathState } from "./breadcrumbs.interface";

export function createInitialState(): BreadCrumbsPathState {
    return {
        paths: []
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'breadcrumbs' })
export class BreadCrumbsStore extends Store<BreadCrumbsPathState>{
    constructor() {
        super(createInitialState());
    }

    resetState(): void {
        this.update(createInitialState());
    }
}