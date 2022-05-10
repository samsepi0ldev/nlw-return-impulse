import { LoadFeedbacksController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLoadFeedbacks } from '@/main/factories/use-cases'

export const makeLoadFeedbacksController = (): Controller => {
  return new LoadFeedbacksController(makeLoadFeedbacks())
}
