import { FastifyInstance } from 'fastify'
import { verifyJWT } from 'src/http/middleware/verifyJwt'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
}
