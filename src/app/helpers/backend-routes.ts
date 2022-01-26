import { ok, error, unauthorized, isLoggedIn, idFromUrl } from "./http-responses"
import { AUTH_USER } from "../constants/global"

export function authenticate(users, body) {
  const { email, password } = body

  const registeredUser = users.find(x => x.email === email && x.password === password)

  if (!registeredUser) return error("Usuário não cadastrado")

  return ok({
    id: registeredUser.id,
    email: registeredUser.email,
    token: "fake-jwt-token",
  })
}

export function register(users, body) {
  const user = body

  if (users.find(x => x.username === user.username)) {
    return error('Username "' + user.username + '" is already taken')
  }

  user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1
  users.push(user)
  localStorage.setItem(AUTH_USER, JSON.stringify(users))

  return ok()
}

export function getUsers(users, headers) {
  if (!isLoggedIn(headers)) return unauthorized()
  return ok(users)
}

export function deleteUser(users, headers, url) {
  if (!isLoggedIn(headers)) return unauthorized()

  users = users.filter(x => x.id !== idFromUrl(url))
  localStorage.setItem(AUTH_USER, JSON.stringify(users))
  return ok()
}
