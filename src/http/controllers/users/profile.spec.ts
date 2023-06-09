import request from 'supertest'
import { app } from 'src/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

// eslint-disable-next-line prettier/prettier
describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register', async () => {
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

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.user).toEqual(
      expect.objectContaining({ email: 'jonhdoe@teste.com' }),
    )
  })
})
