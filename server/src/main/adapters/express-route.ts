import { RequestHandler } from 'express'

import { Controller } from '@/presentation/protocols'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (req, res) => {
  const request = { body: req.body, ...(req.params || {}) }
  const { statusCode, body } = await controller.handle(request)
  const response = [200, 201, 204].includes(statusCode) ? body : { error: body.message }
  res.status(statusCode).json(response)
}
