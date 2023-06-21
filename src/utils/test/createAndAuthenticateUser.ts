import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { prisma } from 'src/database/prisma'
import request from 'supertest'

export async function CreateAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'jonhdoe@teste.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/session').send({
    email: 'jonhdoe@teste.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
