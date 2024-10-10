import { R } from './request'

export function createSuccRes<T>(data?: T): R<T> {
  return { code: '200', message: 'success', data }
}

export function createFailRes<T>(): R<T>
export function createFailRes<T>(code: string, message: string, data?: T): R<T>
export function createFailRes<T>(code = '500', message = 'fail', data?: T): R<T> {
  const result: R<T> = { code, message }
  if (data) result.data = data

  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isRespResult(obj?: any) {
  const isObj = obj instanceof Object
  if (!isObj) return false

  const keys = Object.keys(obj ?? {})
  const size = keys.length
  if (size < 2 || size > 3) return false
  if (size == 3 && !keys.includes('data')) return false

  return keys.includes('code') && keys.includes('message')
}
