export class Page<T> {
  constructor(public content: T[], public totalElements: number){}

    static fromResponse<T>(response:any){
        return new Page<T>(response.body, parseInt(response.headers.get("X-Total-Count")));
    }
}
