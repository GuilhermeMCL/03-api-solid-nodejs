import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { registerUseCase } from "../../services/registerUsecase"


export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    const registerBodyschema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })
    const { name, email, password } = registerBodyschema.parse(request.body)
    try {
        await registerUseCase({
            name,
            email,
            password
        })
    } catch (error) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}