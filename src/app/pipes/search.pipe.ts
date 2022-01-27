import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: "searchPipe",
})
export class SearchPipe implements PipeTransform {
  transform(value: Array<any>, search: string): any {
    if (!search) return value
    search = search.toUpperCase()
    return value.filter(word => word.name.toUpperCase().indexOf(search) >= 0)
  }

  constructor() {}
}
