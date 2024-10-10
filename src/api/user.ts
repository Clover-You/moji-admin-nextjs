import { R, request } from './request'

export interface Geographical {
  label: string
  key: string
}

export interface UserResPosition {
  country: string
  province: Geographical
  city: Geographical
}

export interface UserRes {
  username: string
  avatar: string
  uid: string
  email: string
  sig: string
  position: UserResPosition
  address: string
  phone: string
}

export function getUser() {
  return request.get<R<UserRes>>('/user')
}

export interface LoginReq {
  username: string
  password: string
  remember?: boolean
}

export function userLogin(data: LoginReq) {
  return request.post<R>('/signin', data)
}
