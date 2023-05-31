/* eslint-disable prettier/prettier */
import { UsersRepository } from 'src/repositories/usersRepository'
import { User } from '@prisma/client'
import { ResourceNotFoundErrors } from '../errors/resourceNotFoundErrors'

interface GetUserProfileServiceRequest {
  userId: string
}
interface GetUserProfileResponse {
  user: User
}

export class GetUserProfileService {
  constructor(private userRepository: UsersRepository) { }

  async execute({
    userId
  }: GetUserProfileServiceRequest): Promise<GetUserProfileResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundErrors()
    }

    return { user }
  }
}
