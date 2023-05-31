import { PrismaCheckinRepository } from 'src/repositories/prisma/prismaCheckinRepository'
import { ValidadeCheckInService } from '../CheckIn/validateCheckIn.services'

export function makeValidatedCheckinService() {
  const prismaCheckinRepository = new PrismaCheckinRepository()
  const validadeCheckInService = new ValidadeCheckInService(
    prismaCheckinRepository,
  )

  return validadeCheckInService
}
