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
    const { token } = await CreateAndAuthenticateUser(app, true)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: `Gym New - 1`,
        description: 'Some Description',
        phone: '1599999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    let checkin = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-in/${checkin.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send({ latitude: -27.2092052, longitude: -49.6401091 })

    expect(response.statusCode).toEqual(204)

    checkin = await prisma.checkIn.findFirstOrThrow({
      where: {
        id: checkin.id,
      },
    })

    expect(checkin.validated_at).toEqual(expect.any(Date))
  })
})
