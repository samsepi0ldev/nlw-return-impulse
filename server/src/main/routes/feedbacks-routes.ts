import { Router } from 'express'

import { adaptExpressRoute } from '@/main/adapters'
import { makeSubmitFeedbackController, makeLoadFeedbacksController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/feedbacks', adaptExpressRoute(makeSubmitFeedbackController()))
  router.get('/feedbacks', adaptExpressRoute(makeLoadFeedbacksController()))
}
