/* eslint-disable prettier/prettier */
import { Gym } from '@prisma/client'
import { GymsRepository } from 'src/repositories/gymsRepository'

interface SearchGymRequest {
  query: string
  page: number
}

interface SerachGymResponse {
  gyms: Gym[]
}

export class SearchService {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    query, page
  }: SearchGymRequest): Promise<SerachGymResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
