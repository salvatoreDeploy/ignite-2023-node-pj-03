/* eslint-disable prettier/prettier */
import { CheckIn } from '@prisma/client'
import { CheckInRepository } from 'src/repositories/checkInRepository'


interface FetchUserCheckInsHistoryRequest {
  userId: string

}

interface FetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInRepository: CheckInRepository) { }

  async execute({
    userId
  }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {

    const checkIns = await this.checkInRepository.findManyById(userId)

    return { checkIns }
  }
}
