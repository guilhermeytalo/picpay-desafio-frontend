import { Injectable } from "@angular/core"
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http"
import { Observable, of } from "rxjs"
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators"

import { ok, error, unauthorized, isLoggedIn, idFromUrl } from "../helpers/http-responses"

let users = JSON.parse(localStorage.getItem("users")) || []

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request
    console.log("✅ ~ request", request)

    return of(null).pipe(mergeMap(handleRoute)).pipe(materialize()).pipe(delay(500)).pipe(dematerialize())

    function handleRoute() {
      switch (true) {
        case url.endsWith("/users/authenticate") && method === "POST":
          return authenticate()
        case url.endsWith("/users/register") && method === "POST":
          return register()
        case url.endsWith("/users") && method === "GET":
          return getUsers()
        case url.match(/\/users\/\d+$/) && method === "DELETE":
          return deleteUser()
        default:
          return next.handle(request)
      }
    }

    // route functions
    function authenticate() {
      const { email, password } = body

      const registeredUser = users.find(x => x.email === email && x.password === password)

      if (!registeredUser) return error("Email ou senha incorretos.")

      return ok({
        id: registeredUser.id,
        email: registeredUser.email,
        token: "fake-jwt-token",
      })
    }

    function register() {
      const user = body

      if (users.find(x => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken')
      }

      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1
      users.push(user)
      localStorage.setItem("users", JSON.stringify(users))

      return ok()
    }

    function getUsers() {
      if (!isLoggedIn(headers)) return unauthorized()
      return ok(users)
    }

    function deleteUser() {
      if (!isLoggedIn(headers)) return unauthorized()

      users = users.filter(x => x.id !== idFromUrl(url))
      localStorage.setItem("users", JSON.stringify(users))
      return ok()
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
}
