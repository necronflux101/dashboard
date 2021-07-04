import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { BreadCrumbsPathState } from "./breadcrumbs.interface";
import { BreadCrumbsStore } from "./breadcrumbs.store";

@Injectable({ providedIn: 'root' })
export class BreadcrumbsQuery extends Query<BreadCrumbsPathState>{
    constructor(protected store: BreadCrumbsStore) {
        super(store);
    }
}