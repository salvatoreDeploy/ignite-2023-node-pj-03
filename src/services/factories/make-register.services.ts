import { PrismaUserReposiyory } from 'src/repositories/prisma/prismaUsersRepository'
import { RegisterService } from '../Register/register.services'

export function makeRegisterService() {
  const prismaUserReposiyory = new PrismaUserReposiyory()
  const registerServices = new RegisterService(prismaUserReposiyory)

  return registerServices
}
