import { FastifyInstance } from 'fastify'
import { verifyJWT } from 'src/http/middleware/verifyJwt'
import { FetchUserMetricHistoryController } from './fetchUserMetricHistory.controller'
import { GetUserMetricController } from './getUserMetric.controller'
import { CreateCheckInController } from './createCheckin.controller'
import { ValidateCheckInController } from './validateCheckin.controller'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', FetchUserMetricHistoryController)
  app.get('/check-ins/metric', GetUserMetricController)
  app.post('/check-in/:gymId', CreateCheckInController)
  app.post('/check-in/:checkInId/validate', ValidateCheckInController)
}
