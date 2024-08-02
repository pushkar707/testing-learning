import { describe, expect, it, vi } from "vitest"
import request from "supertest"
import { app } from ".."
import { prismaClient } from "../db/__mocks__/db"

// vi.mock('../db.ts', () => ({ // mocking prismaclient manually without __mocks__ folder
//     prismaClient: {
//         sum: {
//             create: vi.fn()
//         }
//     }
// })) 

vi.mock('../db/db.ts') // after creating __mocks__ folder with same level as db.ts we can just use this syntax

// We need to mock an actual response object when calling prismaClient.sum.create in out app instead of just returning undefined else there will be error accessing response.id
prismaClient.sum.create.mockResolvedValue({
    id: 1,
    a: 1,
    b: 2,
    result: 2
})

vi.spyOn(prismaClient.sum, 'create');

describe('/POST sum route', () => {
    it('correct sum', async () => {
        const res = await request(app).post('/sum').send({
            a: 1,
            b: 2
        })

        // You need to add .spyOn so that jest can spy the values with which .create function is called
        expect(prismaClient.sum.create).toBeCalledWith({
            data: {
                a: 1,
                b: 2,
                result: 3,
            }
        })

        expect(res.body.answer).toBe(3)
        expect(res.statusCode).toBe(200)
        expect(res.body.id).toBe(1)
    })

    it('body validations', async () => {
        const res = await request(app).post('/sum').send({
            a: '34',
            b: 3
        })

        expect(res.body.message).toBe('Incorrect input types')
        expect(res.statusCode).toBe(411)
    })
})