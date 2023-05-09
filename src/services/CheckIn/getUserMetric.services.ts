/* eslint-disable prettier/prettier */
import { CheckInRepository } from 'src/repositories/checkInRepository'



interface GetUserInMetricServiceRequest {
  userId: string

}

interface GetUserMetricServiceResponse {
  checkInsCount: number
}

export class GetUserMetricService {
  constructor(private checkInRepository: CheckInRepository) { }

  async execute({
    userId
  }: GetUserInMetricServiceRequest): Promise<GetUserMetricServiceResponse> {

    const checkInsCount = await this.checkInRepository.countUserById(userId)

    return { checkInsCount }
  }
}
