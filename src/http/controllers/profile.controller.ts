import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserProfileService } from 'src/services/factories/make-getUserProfile.sevices'

export async function profileontroller(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileService()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  Reflect.deleteProperty(user, 'password_hash')

  return reply.status(200).send({ user })
}
