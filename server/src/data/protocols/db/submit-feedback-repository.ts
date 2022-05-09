import { SubmitFeedback } from '@/domain/use-cases'

export interface SubmitFeedbackRepository {
  create: (input: SubmitFeedbackRepository.Input) => Promise<void>
}

export namespace SubmitFeedbackRepository {
  export type Input = SubmitFeedback.Input
}
