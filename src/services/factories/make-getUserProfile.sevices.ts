import { PrismaUserReposiyory } from 'src/repositories/prisma/prismaUsersRepository'
import { GetUserProfileService } from '../Authenticate/getUserProfile.sevices'

export function makeGetUserProfileService() {
  const prismaUserReposiyory = new PrismaUserReposiyory()
  const getUserProfileService = new GetUserProfileService(prismaUserReposiyory)

  return getUserProfileService
}
