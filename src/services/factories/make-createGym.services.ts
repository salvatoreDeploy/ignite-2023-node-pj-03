import { PrismaGymsRepository } from 'src/repositories/prisma/prismaGymsRepository'
import { CreateGymService } from '../Gym/createGym.services'

export function makeCreateGymService() {
  const prismaGymReposiyory = new PrismaGymsRepository()
  const createGymService = new CreateGymService(prismaGymReposiyory)

  return createGymService
}
