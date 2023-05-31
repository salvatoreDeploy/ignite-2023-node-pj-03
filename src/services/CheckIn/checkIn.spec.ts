import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/inMemoryCheckInsRepository'
import { CheckInService } from './checkIn.services'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/inMemoryGymsRepository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceErrors } from '../errors/maxDistanceErrors'
import { MaxNumberOfCheackInsErrors } from '../errors/maxNumberOfCheackInsErrors'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check In Service', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(inMemoryCheckInsRepository, inMemoryGymsRepository)

    await inMemoryGymsRepository.create({
      id: 'gym-id-1',
      title: 'Gym',
      description: '',
      phone: '',
      latitude: -22.5688278,
      longitude: -48.6357383,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Shoud be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -22.5688278,
      userLongitude: -48.6357383,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Shoud not be able to check-in in twice in the some day', async () => {
    vi.setSystemTime(new Date(2022, 0, 3, 2, 0, 0))

    await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -22.5688278,
      userLongitude: -48.6357383,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-id-1',
        gymId: 'gym-id-1',
        userLatitude: -22.5688278,
        userLongitude: -48.6357383,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheackInsErrors)
  })

  it('Shoud not be able to check-in in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 1, 2, 0, 0))

    await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -22.5688278,
      userLongitude: -48.6357383,
    })

    vi.setSystemTime(new Date(2022, 0, 2, 2, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -22.5688278,
      userLongitude: -48.6357383,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Shoud not be able to check-in on distance gym', async () => {
    inMemoryGymsRepository.gyms.push({
      id: 'gym-id-2',
      title: 'Gym 2',
      description: '',
      phone: '',
      latitude: new Decimal(-22.5688278),
      longitude: new Decimal(-48.6357383),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id-2',
        userId: 'user-id-1',
        userLatitude: -27.5688278,
        userLongitude: -49.6357383,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceErrors)
  })
})
