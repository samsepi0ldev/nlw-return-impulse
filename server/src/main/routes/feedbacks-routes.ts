import { Router } from 'express'

import { adaptExpressRoute } from '@/main/adapters'
import { makeSubmitFeedbackController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/feedbacks', adaptExpressRoute(makeSubmitFeedbackController()))
}
