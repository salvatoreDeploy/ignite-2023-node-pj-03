/* eslint-disable prettier/prettier */
import { UsersRepository } from 'src/repositories/usersRepository'
import { InvalidCredentialsErrors } from '../errors/invalidCredentialsErrors'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateServiceRequest {
  email: string
  password: string
}
interface AuthenticateServiceResponse {
  user: User
}

export class AuthenticateService {
  constructor(private userRepository: UsersRepository) { }

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsErrors()
    }

    const doesPasswordMatch = await compare(password, user.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsErrors()
    }

    return { user }
  }
}
