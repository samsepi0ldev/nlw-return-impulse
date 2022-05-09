import 'module-alias/register'

import { setupApp } from '@/main/config'

const app = setupApp()

app.listen(process.env.PORT ?? 3333, () => {
  console.log('Server running at http://localhost:3333/')
})
