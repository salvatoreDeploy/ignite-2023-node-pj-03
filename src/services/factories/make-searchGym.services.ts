import { PrismaGymsRepository } from 'src/repositories/prisma/prismaGymsRepository'
import { SearchService } from '../Gym/searchGym.services'

export function makeSearchGymService() {
  const prismaGymRepository = new PrismaGymsRepository()
  const searchService = new SearchService(prismaGymRepository)

  return searchService
}
