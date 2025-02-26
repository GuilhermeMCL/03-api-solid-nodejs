import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { PrismaUsersRepository } from '../repositories/prisma-users-repository';

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string
}



export async function registerUseCase({
    name,
    email,
    password,
}: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithEmail) {
        throw new Error("Email already exists / Email já existe")
    }


    const prismaUsersRepository = new PrismaUsersRepository
    await prismaUsersRepository.create({
        name,
        email,
        password_hash
    })


}