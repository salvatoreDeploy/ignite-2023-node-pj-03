import { Prisma, User } from '@prisma/client'
import { prisma } from 'src/database/prisma'
import { UsersRepository } from '../usersRepository'

export class PrismaUserReposiyory implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return userWithSameEmail
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
