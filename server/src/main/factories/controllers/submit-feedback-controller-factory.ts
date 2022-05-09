import { SubmitFeedbackController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeSubmitFeedback } from '@/main/factories/use-cases'
import { makeSubmitFeedbacksValidation } from '@/main/factories/controllers'

export const makeSubmitFeedbackController = (): Controller => {
  return new SubmitFeedbackController(makeSubmitFeedbacksValidation(), makeSubmitFeedback())
}
