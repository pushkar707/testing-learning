// Jest goes through all files having .test.ts
import {describe, expect, it } from "@jest/globals"
import { sum } from ".."

describe("Testing sum function", () => {
    it("should sum 1 and 2 correctly", () => {
        expect(sum(1,2)).toBe(3);
    })
})