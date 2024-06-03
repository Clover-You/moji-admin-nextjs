import { R, request } from "./request"

export function getUser() {
  return request.get("/user")
}

export interface LoginReq {
  username: string
  password: string
  remember?: boolean
}

export function userLogin(data: LoginReq) {
  return request.post<R>("/signin", data)
}
