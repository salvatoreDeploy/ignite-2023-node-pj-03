import { PrismaCheckinRepository } from 'src/repositories/prisma/prismaCheckinRepository'
import { FetchUserCheckInsHistoryService } from '../CheckIn/fetchUserCheckInsHistory.services'

export function makeFetchUserCheckInHistoryService() {
  const prismaCheckinReposiyory = new PrismaCheckinRepository()
  const fetchUserCheckinHistory = new FetchUserCheckInsHistoryService(
    prismaCheckinReposiyory,
  )

  return fetchUserCheckinHistory
}
