import { Injectable } from "@angular/core";
import { BreadCrumbsStore } from "./breadcrumbs.store";

@Injectable({ providedIn: 'root' })
export class BreadCrumbsService {

    constructor(
        private breadcrumbsStore: BreadCrumbsStore
    ) {
    }

    updateBreadCrumbsState(state: any) {
        const paths = {
            paths: state
        }
        this.breadcrumbsStore.update(paths);
    }
}