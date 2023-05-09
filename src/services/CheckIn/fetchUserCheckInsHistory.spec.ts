import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/inMemoryCheckInsRepository'

import { FetchUserCheckInsHistoryService } from './fetchUserCheckInsHistory.services'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryService

describe('Fetch User Check-in History Service', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryService(inMemoryCheckInsRepository)
  })

  it('Shoud be able to fetch check-in history', async () => {
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

    const { checkIns } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkIns).toHaveLength(3)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
      expect.objectContaining({ gym_id: 'gym-03' }),
    ])
  })
})
