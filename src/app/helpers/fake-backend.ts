import { Injectable } from "@angular/core"
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http"
import { Observable, of } from "rxjs"
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators"
import { ok, error } from "./http-responses"
import { JWT_TOKEN, REGISTERED_USERS } from "../constants/global"
import { User } from "../models/user"

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = request

    return of(null).pipe(mergeMap(handleRoute)).pipe(materialize()).pipe(delay(500)).pipe(dematerialize())

    function handleRoute() {
      switch (true) {
        case url.endsWith("/users/authenticate") && method === "POST":
          return authenticate(body)
        default:
          return next.handle(request)
      }
    }

    function authenticate(body: User) {
      try {
        let users = JSON.parse(localStorage.getItem(REGISTERED_USERS)) || []

        const { email, password } = body

        const registeredUser = users.find((u: User) => u.email === email && u.password === password)

        if (!registeredUser) return error("Email ou senha incorretos.")

        return ok({
          id: registeredUser.id,
          email: registeredUser.email,
          token: JWT_TOKEN,
        })
      } catch (error) {
        throw error
      }
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
}
