/* eslint-disable prettier/prettier */
import { Gym } from '@prisma/client'
import { GymsRepository } from 'src/repositories/gymsRepository'

interface FetchNearbyGymsRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    userLatitude, userLongitude
  }: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({ latitude: userLatitude, longitude: userLongitude })

    return { gyms }
  }
}
