import { ok, error, unauthorized, isLoggedIn, idFromUrl } from "./http-responses"
import { JWT_TOKEN, REGISTERED_USERS } from "../constants/global"

let users = JSON.parse(localStorage.getItem(REGISTERED_USERS)) || []

export function authenticate(body) {
  const { email, password } = body

  const registeredUser = users.find(x => x.email === email && x.password === password)

  if (!registeredUser) return error("Email ou senha incorretos")

  return ok({
    id: registeredUser.id,
    email: registeredUser.email,
    token: JWT_TOKEN,
  })
}

export function register(body) {
  const user = body

  if (users.find(x => x.email === user.email)) {
    return error('Email "' + user.email + '" is already taken')
  }

  user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1
  users.push(user)
  localStorage.setItem(REGISTERED_USERS, JSON.stringify(users))

  return ok()
}

export function getUsers(headers) {
  if (!isLoggedIn(headers)) return unauthorized()
  return ok(users)
}

export function deleteUser(headers, url) {
  if (!isLoggedIn(headers)) return unauthorized()

  users = users.filter(x => x.id !== idFromUrl(url))
  localStorage.setItem(REGISTERED_USERS, JSON.stringify(users))
  return ok()
}
