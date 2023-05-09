import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register.services'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/inMemoryUsersRepository'
import { UserAlreadyExistsError } from '../errors/userAlreadyExistsErrors'

let inMemoryUserRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    sut = new RegisterService(inMemoryUserRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Joe Doe',
      email: 'joe@email.com',
      password: 'joedoe',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Joe Doe',
      email: 'joe@email.com',
      password: 'joedoe',
    })

    const isPasswordCorrectlyHashed = await compare(
      'joedoe',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'joe@email.com'

    await sut.execute({
      name: 'Joe Doe',
      email,
      password: 'joedoe',
    })

    expect(() =>
      sut.execute({
        name: 'Joe Doe',
        email,
        password: 'joedoe',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
