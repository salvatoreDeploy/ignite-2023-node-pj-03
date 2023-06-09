import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchNearByGymsService } from 'src/services/factories/make-fetchNearbyGyms.services'

import { z } from 'zod'

export async function FetchNearbyGYmsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const nearbyGymsQueryParamsSchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsQueryParamsSchema.parse(
    request.query,
  )

  const fetchNearbyGymsService = makeFetchNearByGymsService()

  const { gyms } = await fetchNearbyGymsService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({ gyms })
}
