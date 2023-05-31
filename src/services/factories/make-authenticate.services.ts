import { PrismaUserReposiyory } from 'src/repositories/prisma/prismaUsersRepository'
import { AuthenticateService } from '../Authenticate/authenticate.services'

export function makeAuthenticateService() {
  const prismaUserReposiyory = new PrismaUserReposiyory()
  const authenticateServices = new AuthenticateService(prismaUserReposiyory)

  return authenticateServices
}
