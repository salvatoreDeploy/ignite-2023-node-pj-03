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

  it('Should be able to list nearby gyms', async () => {
    const { token } = await CreateAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/creategym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: `Gym New - 1`,
        description: 'Some Description',
        phone: '1599999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    await request(app.server)
      .post('/creategym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: `Gym New - 2`,
        description: 'Some Description',
        phone: '1599999999',
        latitude: -27.0610928,
        longitude: -49.5229501,
      })

    const response = await request(app.server)
      .get('/fetchgym')
      .query({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(201)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym New - 1',
      }),
    ])
  })
})
