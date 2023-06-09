import request from 'supertest'
import { app } from 'src/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

// eslint-disable-next-line prettier/prettier
describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to aut', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'jonhdoe@teste.com',
      password: '123456',
    })

    const response = await request(app.server).post('/session').send({
      email: 'jonhdoe@teste.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
