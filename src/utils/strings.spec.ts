import { describe, test, expect } from "vitest"
import { has } from "./strings"

describe("string utils test unit", () => {
  test("has: should return false when str is empty", () => {
    expect(has()).toBeFalsy()
    expect(has("")).toBeFalsy()
    expect(has(" ")).toBeFalsy()
    expect(has(null as unknown as undefined)).toBeFalsy()
  })
})
