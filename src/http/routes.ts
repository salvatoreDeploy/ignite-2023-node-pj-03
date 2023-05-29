import { FastifyInstance } from 'fastify'
import { registerController } from './controllers/resgiter.controller'
import { authenticateController } from './controllers/authenticate.controller'
import { profileontroller } from './controllers/profile.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/session', authenticateController)

  /*  Authenticated */
  app.get('/me', profileontroller)
}
