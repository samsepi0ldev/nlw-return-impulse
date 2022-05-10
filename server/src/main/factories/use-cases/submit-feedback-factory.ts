import { DbSubmitFeedback } from '@/data/use-cases'
import { SubmitFeedback } from '@/domain/use-cases'
import { FeedbackPrismaRepository } from '@/infra/db'
import { NodemailerAdapter } from '@/infra/mail'
import { env } from '@/main/config'

export const makeSubmitFeedback = (): SubmitFeedback => {
  const feedbackRepository = new FeedbackPrismaRepository()
  const nodemailerAdapter = new NodemailerAdapter(env.transporter)
  return new DbSubmitFeedback(feedbackRepository, nodemailerAdapter)
}
