import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/inMemoryCheckInsRepository'
import { GetUserMetricService } from './getUserMetric.services'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricService

describe('Get User Metric Service', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricService(inMemoryCheckInsRepository)
  })

  it('Shoud be able to get check-ins count from metrics', async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-03',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(3)
  })
})
