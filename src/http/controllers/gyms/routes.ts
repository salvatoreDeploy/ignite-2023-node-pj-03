import { FastifyInstance } from 'fastify'
import { verifyJWT } from 'src/http/middleware/verifyJwt'
import { CreateGymController } from './createGym.controller'
import { SearchGymController } from './searchGym.Controller'
import { FetchNearbyGYmsController } from './fetchNearbyGyms.controller'
import { verifyUserRole } from 'src/http/middleware/verifyUserRole'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post(
    '/creategym',
    { onRequest: [verifyUserRole('ADMIN')] },
    CreateGymController,
  )
  app.get('/searchgym', SearchGymController)
  app.get('/fetchgym', FetchNearbyGYmsController)
}
