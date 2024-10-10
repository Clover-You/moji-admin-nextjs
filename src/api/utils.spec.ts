import { describe, test, expect } from 'vitest'

import { isRespResult, createSuccRes, createFailRes } from './utils'

describe('api utils', () => {
  test('should return true when result is response data', () => {
    expect(isRespResult(createFailRes())).toBeTruthy()
    expect(isRespResult(createFailRes('500', 'fail', {}))).toBeTruthy()

    expect(isRespResult(createSuccRes())).toBeTruthy()
    expect(isRespResult(createSuccRes('data'))).toBeTruthy()
  })

  test('should return false when result is response data', () => {
    expect(isRespResult({ ...createFailRes(), key: 1 })).toBeFalsy()
    expect(isRespResult({ ...createFailRes('500', 'fail', {}), xa: 2 })).toBeFalsy()

    expect(isRespResult({ ...createSuccRes(), name: 'clover' })).toBeFalsy()
    expect(isRespResult({ ...createSuccRes('data'), age: 21 })).toBeFalsy()
  })
})
