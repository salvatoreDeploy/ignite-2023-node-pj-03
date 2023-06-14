import request from 'supertest'
import { app } from 'src/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { CreateAndAuthenticateUser } from 'src/utils/test/createAndAuthenticateUser'

// eslint-disable-next-line prettier/prettier
describe('Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a gym', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/creategym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym New',
        description: 'Some Description',
        phone: '1599999999',
        latitude: -22.5688278,
        longitude: -48.6357383,
      })

    expect(response.statusCode).toEqual(201)
  })
})
