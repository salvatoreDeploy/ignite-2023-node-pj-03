import { PrismaCheckinRepository } from 'src/repositories/prisma/prismaCheckinRepository'
import { GetUserMetricService } from '../CheckIn/getUserMetric.services'

export function makeGetUserMetricService() {
  const prismaCheckinRepository = new PrismaCheckinRepository()
  const getUserMetricService = new GetUserMetricService(prismaCheckinRepository)

  return getUserMetricService
}
