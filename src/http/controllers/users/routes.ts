import { FastifyInstance } from 'fastify'
import { registerController } from './register.controller'
import { authenticateController } from './authenticate.controller'
import { verifyJWT } from 'src/http/middleware/verifyJwt'
import { profileController } from './profile.controller'
import { refreshTokenController } from './refreshToken.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/session', authenticateController)

  app.patch('/token/refreshtoken', refreshTokenController)

  /*  Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
