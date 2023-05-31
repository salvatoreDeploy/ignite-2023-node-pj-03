import { expect, describe, it, beforeEach } from 'vitest'
import { SearchService } from './searchGym.services'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/inMemoryGymsRepository'

let inMemoryGymRepository: InMemoryGymsRepository
let sut: SearchService

describe('Search Gyms Service', () => {
  beforeEach(async () => {
    inMemoryGymRepository = new InMemoryGymsRepository()
    sut = new SearchService(inMemoryGymRepository)
  })

  it('Shoud be able to search for Gyms', async () => {
    await inMemoryGymRepository.create({
      title: 'Gym New',
      description: null,
      phone: null,
      latitude: -22.5688278,
      longitude: -48.6357383,
    })

    await inMemoryGymRepository.create({
      title: 'Gym New 2',
      description: null,
      phone: null,
      latitude: -23.5688278,
      longitude: -49.6357383,
    })

    const { gyms } = await sut.execute({
      query: 'Gym New 2',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Gym New 2' })])
  })

  it('Shoud be able to fetch paginated search gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymRepository.create({
        title: `Gym New - ${i}`,
        description: null,
        phone: null,
        latitude: -23.5688278,
        longitude: -49.6357383,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym New',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym New - 21' }),
      expect.objectContaining({ title: 'Gym New - 22' }),
    ])
  })
})
