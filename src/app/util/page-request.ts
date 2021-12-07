import { IPageQuery } from '../models/pagination/page-query';
import { IQueryBuild } from '../models/pagination/query-build';
import { ISortQuery } from '../models/pagination/sort-query';

export class PageRequest implements IQueryBuild {
  constructor(public pageQuery: IPageQuery, public sortQuery: ISortQuery, public aditionalQuery: Map<string, string>) { }

    buildQueryMap(): Map<string, string> {

        let buildQueryMap = new Map<string, string>([...this.buildPageQueryMap(), ...this.buildSortQueryMap()]);

        if (this.aditionalQuery) {
            buildQueryMap = new Map<string, string>([...buildQueryMap, ...this.aditionalQuery])
        }

        return buildQueryMap;
    }

    buildQueryString(): string {

        return Array.from(this.buildQueryMap()).map(itemArray => `${itemArray[0]}=${itemArray[1]}`).join("&");

    }

    buildPageQueryMap(): Map<string, string> {

        let buildPageQueryMap = new Map<string, string>();

        buildPageQueryMap.set("_page", `${this.pageQuery.pageNumber + 1}`);
        buildPageQueryMap.set("_limit", `${this.pageQuery.pageSize}`);

        return buildPageQueryMap;

    }

    buildSortQueryMap(): Map<string, string> {

        let buildPageQueryMap = new Map<string, string>();

        buildPageQueryMap.set("_sort", `${this.sortQuery.property}`);
        buildPageQueryMap.set("_order", `${this.sortQuery.direction}`);

        return buildPageQueryMap;

    }
}
