import express from "express"
import { prismaClient } from "./db"
import { Operation } from "@prisma/client"
import z from "zod"

export const app = express()

app.use(express.json())

const sumPostType = z.object({
    a: z.number(),
    b: z.number(),
    operation: z.enum(['ADD', 'MUL'])
})


app.post('/sum', async (req, res) => {
    const parsedBody = sumPostType.safeParse(req.body)
    if (!parsedBody.success)
        return res.status(411).json({ message: 'Incorrect input types' })


    const { a, b, operation } = parsedBody.data
    let answer: number = 0;
    if(operation === Operation.ADD)
        answer = a + b;
    else if (operation === Operation.MUL)
        answer = a * b;

    const response = await prismaClient.request.create({
        data: {
            a,
            b,
            result: answer,
            operation
        }
    })
    return res.json({ answer, id: response.id })
})