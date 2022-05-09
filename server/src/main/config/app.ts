import express, { Express } from 'express'

import { setupMiddlewares, setupRoutes } from '@/main/config'

const setupApp = (): Express => {
  const app = express()

  setupMiddlewares(app)
  setupRoutes(app)

  return app
}

export { setupApp }
