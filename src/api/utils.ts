import { R } from "./request"

export function createSuccRes<T>(data?: T): R<T> {
  return { code: "200", message: "success", data }
}

export function createFailRes<T>(code: string, message = "fail", data?: T): R<T> {
  return { code, message, data }
}
