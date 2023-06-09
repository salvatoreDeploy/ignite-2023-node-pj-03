import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchUserCheckInHistoryService } from 'src/services/factories/make-fetchUserCheckinHistory.services'

import { z } from 'zod'

export async function FetchUserMetricHistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchUserMetricHistoryQueryParamSchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = fetchUserMetricHistoryQueryParamSchema.parse(request.query)

  const fetchUserMetricHistoryService = makeFetchUserCheckInHistoryService()

  const { checkIns } = await fetchUserMetricHistoryService.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(201).send({
    checkIns,
  })
}
