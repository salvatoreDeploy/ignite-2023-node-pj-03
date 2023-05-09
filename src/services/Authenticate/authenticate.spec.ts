import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/inMemoryUsersRepository'
import { AuthenticateService } from './authenticate.services'
import { hash } from 'bcryptjs'
import { InvalidCredentialsErrors } from '../errors/invalidCredentialsErrors'

let inMemoryUserRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(inMemoryUserRepository)
  })

  it('should be able to authenticate', async () => {
    await inMemoryUserRepository.create({
      name: 'Joe Doe',
      email: 'joe@email.com',
      password_hash: await hash('joedoe', 6),
    })

    const { user } = await sut.execute({
      email: 'joe@email.com',
      password: 'joedoe',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(inMemoryUserRepository)

    await expect(() =>
      sut.execute({
        email: 'joe@email.com',
        password: 'joedoe',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsErrors)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(inMemoryUserRepository)

    await inMemoryUserRepository.create({
      name: 'Joe Doe',
      email: 'joe@email.com',
      password_hash: await hash('joedoe', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'joe@email.com',
        password: 'teste',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsErrors)
  })
})
