import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: "searchPipe",
})
export class SearchPipe implements PipeTransform {
  transform(value: Array<any>, search: string): any {
    if (search) {
      search = search.toUpperCase()
      return value.filter(a => a.name.toUpperCase().indexOf(search) >= 0)
    } else {
      return value
    }
  }

  constructor() {}
}
