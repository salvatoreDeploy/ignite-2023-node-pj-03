import { FastifyReply, FastifyRequest } from 'fastify'
import { makeValidatedCheckinService } from 'src/services/factories/make-validateCheckin.services'

import { z } from 'zod'

export async function ValidateCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const validateCheckInQueryParam = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInQueryParam.parse(request.params)

  const validateCheckInService = makeValidatedCheckinService()

  await validateCheckInService.execute({
    checkId: checkInId,
  })

  return reply.status(204).send()
}
