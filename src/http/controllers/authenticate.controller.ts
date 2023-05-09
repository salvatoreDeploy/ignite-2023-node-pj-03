import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsErrors } from 'src/services/errors/invalidCredentialsErrors'
import { makeAuthenticateService } from 'src/services/factories/make-authenticate.services'

import { z } from 'zod'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateServices = makeAuthenticateService()

    await authenticateServices.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsErrors) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(200).send()
}
