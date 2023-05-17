/* eslint-disable prettier/prettier */
import { CheckIn } from '@prisma/client'
import { CheckInRepository } from 'src/repositories/checkInRepository'
import { ResourceNotFoundErrors } from '../errors/resourceNotFoundErrors'


interface ValidadeCheckInServiceRequest {
  checkId: string
}

interface ValidadeCheckInServiceResponse {
  checkIn: CheckIn
}

export class ValidadeCheckInService {
  constructor(private checkInRepository: CheckInRepository) { }

  async execute({
    checkId
  }: ValidadeCheckInServiceRequest): Promise<ValidadeCheckInServiceResponse> {

    const checkIn = await this.checkInRepository.findByid(checkId)

    if (!checkIn) {
      throw new ResourceNotFoundErrors()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
