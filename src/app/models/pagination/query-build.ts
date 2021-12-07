import { ISortQuery } from './sort-query';
import { IPageQuery } from './page-query';

export interface IQueryBuild {
    pageQuery: IPageQuery;
    sortQuery: ISortQuery;
    aditionalQuery: Map<string, string>;
    buildQueryMap(): Map<string, string>;
    buildQueryString(): string;
    buildPageQueryMap(): Map<string, string>;
    buildSortQueryMap(): Map<string, string>;
}
