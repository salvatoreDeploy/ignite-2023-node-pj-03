import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchGymService } from 'src/services/factories/make-searchGym.services'

import { z } from 'zod'

export async function SearchGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymQueryParamSchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymQueryParamSchema.parse(request.body)

  const csearchGymService = makeSearchGymService()

  await csearchGymService.execute({
    query,
    page,
  })

  return reply.status(201).send()
}
