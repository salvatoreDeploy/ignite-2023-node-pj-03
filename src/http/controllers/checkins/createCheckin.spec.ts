import request from 'supertest'
import { app } from 'src/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { prisma } from 'src/database/prisma'
import { CreateAndAuthenticateUser } from 'src/utils/test/createAndAuthenticateUser'

// eslint-disable-next-line prettier/prettier
describe('Check-In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a check-in', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: `Gym New - 1`,
        description: 'Some Description',
        phone: '1599999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    const response = await request(app.server)
      .post(`/check-in/${gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ latitude: -27.2092052, longitude: -49.6401091 })

    expect(response.statusCode).toEqual(201)
  })
})
