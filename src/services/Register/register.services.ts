/* eslint-disable prettier/prettier */
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from 'src/services/errors/userAlreadyExistsErrors'
import { UsersRepository } from 'src/repositories/usersRepository'
import { User } from '@prisma/client'


interface RegisterServiceRequest {
  email: string
  name: string
  password: string
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, name, password }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,

    })

    return {
      user
    }
  }
}
