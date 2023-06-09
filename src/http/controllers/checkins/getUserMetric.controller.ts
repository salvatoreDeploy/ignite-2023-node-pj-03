import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricService } from 'src/services/factories/make-getUserMetric.services'

export async function GetUserMetricController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserMetricService = makeGetUserMetricService()

  const { checkInsCount } = await getUserMetricService.execute({
    userId: request.user.sub,
  })

  return reply.status(201).send({
    checkInsCount,
  })
}
