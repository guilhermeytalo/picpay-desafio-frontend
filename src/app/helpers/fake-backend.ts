import { Injectable } from "@angular/core"
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http"
import { Observable, of } from "rxjs"
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators"
import { authenticate, register, getUsers, deleteUser } from "./fake-backend-routes"

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request

    return of(null).pipe(mergeMap(handleRoute)).pipe(materialize()).pipe(delay(500)).pipe(dematerialize())

    function handleRoute() {
      switch (true) {
        case url.endsWith("/users/authenticate") && method === "POST":
          return authenticate(body)
        case url.endsWith("/users/register") && method === "POST":
          return register(body)
        case url.endsWith("/users") && method === "GET":
          return getUsers(headers)
        case url.match(/\/users\/\d+$/) && method === "DELETE":
          return deleteUser(headers, url)
        default:
          return next.handle(request)
      }
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
}
