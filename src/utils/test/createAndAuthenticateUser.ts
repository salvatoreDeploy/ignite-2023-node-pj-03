import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function CreateAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'jonhdoe@teste.com',
    password: '123456',
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
