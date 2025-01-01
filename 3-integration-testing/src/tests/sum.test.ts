import { describe, it, expect } from "vitest"
import request from "supertest"
import { app } from ".."

describe("sum tests", () => {
    it("check correct sum", async () => {
        const { statusCode, body } = await request(app).post('/sum').send({
            a: 2,
            b: 1,
            operation: 'MUL'
        })

        expect(body).toEqual({ answer: 2, id: expect.any(Number) })
        expect(statusCode).toBe(200)
    })
})