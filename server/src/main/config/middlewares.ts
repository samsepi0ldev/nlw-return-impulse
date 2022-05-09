import { Express } from 'express'
import { bodyParser, cors, contentType } from '@/main/middlewares'

export const setupMiddlewares = (app: Express): void => {
  app.use(cors)
  app.use(bodyParser)
  app.use(contentType)
}
