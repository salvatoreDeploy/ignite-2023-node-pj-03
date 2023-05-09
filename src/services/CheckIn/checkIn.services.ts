/* eslint-disable prettier/prettier */
import { CheckIn } from '@prisma/client'
import { CheckInRepository } from 'src/repositories/checkInRepository'
import { GymsRepository } from 'src/repositories/gymsRepository'
import { ResourceNotFoundErrors } from '../errors/resourceNotFoundErrors'
import { getDistanceBetweenCoordinates } from 'src/utils/getDistanceBetweenCoordinates'
import { MaxNumberOfCheackInsErrors } from '../errors/maxNumberOfCheackInsErrors'
import { MaxDistanceErrors } from '../errors/maxDistanceErrors'

interface CheckInServiceRequest {
  userId: string
  gymId: string
  userLatitude: number,
  userLongitude: number
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(private checkInRepository: CheckInRepository, private gymsRepository: GymsRepository) { }

  async execute({
    gymId, userId, userLatitude, userLongitude
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {

    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundErrors()
    }

    const distance = getDistanceBetweenCoordinates({ latitude: userLatitude, longitude: userLongitude }, { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() })


    const MAX_DISTANCE_IN_KILOMETERES = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERES) {
      throw new MaxDistanceErrors
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheackInsErrors
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId
    })


    return { checkIn }
  }
}
