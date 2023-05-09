/* eslint-disable prettier/prettier */
import { CheckIn } from '@prisma/client'
import { CheckInRepository } from 'src/repositories/checkInRepository'


interface FetchUserCheckInsHistoryRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInRepository: CheckInRepository) { }

  async execute({
    userId, page
  }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {

    const checkIns = await this.checkInRepository.findManyById(userId, page)

    return { checkIns }
  }
}
