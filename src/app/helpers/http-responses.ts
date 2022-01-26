import { HttpResponse } from "@angular/common/http"
import { of, throwError } from "rxjs"
import { JWT_TOKEN, HEADER_AUTH } from "../constants/global"

export function ok(body?) {
  return of(new HttpResponse({ status: 200, body }))
}

export function error(message) {
  return throwError({ error: { message } })
}

export function unauthorized() {
  return throwError({ status: 401, error: { message: "Unauthorised" } })
}

export function isLoggedIn(headers) {
  return headers.get(HEADER_AUTH) === `Bearer ${JWT_TOKEN}`
}

export function idFromUrl(url) {
  const urlParts = url.split("/")
  return parseInt(urlParts[urlParts.length - 1])
}
