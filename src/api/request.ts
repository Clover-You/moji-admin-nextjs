import Axios, { AxiosResponse } from "axios"

export interface R<T = never> {
  data?: T
  message: string
  code: string
}

export type AxiosRes<T = never> = AxiosResponse<R<T>>

export enum Status {
  Success = "200",
}

export const request = Axios.create({
  baseURL: "/api",
})
