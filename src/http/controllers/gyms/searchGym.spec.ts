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

  it('Should be able to search a gym', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    for (let i = 1; i <= 3; i++) {
      await request(app.server)
        .post('/creategym')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: `Gym New - ${i}`,
          description: 'Some Description',
          phone: '1599999999',
          latitude: -22.5688278,
          longitude: -48.6357383,
        })
    }

    const response = await request(app.server)
      .get('/searchgym')
      .query({
        query: 'Gym New - 2',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(201)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym New - 2',
      }),
    ])
  })
})
