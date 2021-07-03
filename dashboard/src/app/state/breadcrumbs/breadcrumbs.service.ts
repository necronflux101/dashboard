import { Injectable } from "@angular/core";
import { BreadCrumbsStore } from "./breadcrumbs.store";

@Injectable({ providedIn: 'root' })
export class BreadCrumbsService {

    constructor(
        private breadcrumbsStore: BreadCrumbsStore
    ) {
    }

    updateBreadCrumbsState(state: any) {
        console.log('Update Breadcrumbs State: ', state);
        const paths = {
            paths: state
        }
        this.breadcrumbsStore.update(paths);
    }
}