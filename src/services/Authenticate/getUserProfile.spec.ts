import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/inMemoryUsersRepository'
import { hash } from 'bcryptjs'
import { GetUserProfileService } from './getUserProfile.sevices'
import { ResourceNotFoundErrors } from '../errors/resourceNotFoundErrors'

let inMemoryUserRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(inMemoryUserRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUserRepository.create({
      name: 'Joe Doe',
      email: 'joe@email.com',
      password_hash: await hash('joedoe', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Joe Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundErrors)
  })
})
