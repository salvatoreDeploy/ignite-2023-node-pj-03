import { PrismaGymsRepository } from 'src/repositories/prisma/prismaGymsRepository'
import { FetchNearbyGymsService } from '../Gym/fetchNearbyGyms.services'

export function makeFetchNearByGymsService() {
  const prismaGymsReposiyory = new PrismaGymsRepository()
  const fetchNearByGymsService = new FetchNearbyGymsService(
    prismaGymsReposiyory,
  )

  return fetchNearByGymsService
}
