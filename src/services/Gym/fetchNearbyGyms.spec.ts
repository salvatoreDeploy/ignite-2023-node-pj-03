import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/inMemoryGymsRepository'
import { FetchNearbyGymsService } from './fetchNearbyGyms.services'

let inMemoryGymRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(async () => {
    inMemoryGymRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsService(inMemoryGymRepository)
  })

  it('Shoud be able to fetch nearby gyms', async () => {
    await inMemoryGymRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -22.5688278,
      longitude: -48.6357383,
    })

    await inMemoryGymRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -22.1330736,
      longitude: -51.4845984,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.5688278,
      userLongitude: -48.6357383,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
