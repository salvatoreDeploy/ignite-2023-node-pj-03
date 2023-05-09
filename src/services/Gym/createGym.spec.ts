import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/inMemoryGymsRepository'
import { CreateGymService } from './createGym.services'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Register Service', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(inMemoryGymsRepository)
  })

  it('should be able to create new Gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym New',
      description: null,
      phone: null,
      latitude: -22.5688278,
      longitude: -48.6357383,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
