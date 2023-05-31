import { PrismaCheckinRepository } from 'src/repositories/prisma/prismaCheckinRepository'
import { CheckInService } from '../CheckIn/checkIn.services'
import { PrismaGymsRepository } from 'src/repositories/prisma/prismaGymsRepository'

export function makeCheckinService() {
  const prismaCheckinReposiyory = new PrismaCheckinRepository()
  const prismaGymRepository = new PrismaGymsRepository()

  const checkinService = new CheckInService(
    prismaCheckinReposiyory,
    prismaGymRepository,
  )

  return checkinService
}
