import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCheckinService } from 'src/services/factories/make-checkin.services'

import { z } from 'zod'

export async function CreateCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInQueryParam = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)
  const { gymId } = createCheckInQueryParam.parse(request.params)

  const createCheckInService = makeCheckinService()

  await createCheckInService.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
