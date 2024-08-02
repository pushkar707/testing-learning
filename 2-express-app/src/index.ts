import express from "express";
import z from "zod"
import { prismaClient } from "./db/db";


export const app = express()
app.use(express.json())

const sumPostType = z.object({
    a: z.number(),
    b: z.number()
})

app.post('/sum', async (req, res) => {
    const parsedBody = sumPostType.safeParse(req.body)
    if (!parsedBody.success)
        return res.status(411).json({ message: 'Incorrect input types' })


    const { a, b } = parsedBody.data
    const answer = a + b;

    const response = await prismaClient.sum.create({
        data: {
            a,
            b,
            result: answer,
        }
    })

    // const response = await prismaClient.sum.create({
    //     data: {
    //         a: b, // without using spies test cases will pass, and this error will go undetected
    //         b: a,
    //         result: answer,
    //     }
    // })
    // We need to mock an actual response object with key id, instead of just returning undefined else there will be error accessing response.id
    return res.json({ answer, id: response.id })
})