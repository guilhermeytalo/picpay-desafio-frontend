import { ok, error } from "./http-responses"
import { JWT_TOKEN, REGISTERED_USERS } from "../constants/global"
import { User } from "../models/user"

let users = JSON.parse(localStorage.getItem(REGISTERED_USERS)) || []

type bodyType = {
  id: number
  email: string
  password: string
  token: string
}

export function authenticate(body: bodyType) {
  try {
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

export function register(body: bodyType) {
  try {
    const user = body

    if (users.find((u: User) => u.email === user.email)) {
      return error('Esse email "' + user.email + '" já possui cadastro')
    }

    user.id = users.length ? Math.max(...users.map((u: User) => u.id)) + 1 : 1
    users.push(user)
    localStorage.setItem(REGISTERED_USERS, JSON.stringify(users))

    return ok()
  } catch (error) {
    throw error
  }
}
