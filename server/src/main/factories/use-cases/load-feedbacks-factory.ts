import { DbLoadFeedbacks } from '@/data/use-cases'
import { LoadFeedbacks } from '@/domain/use-cases'
import { FeedbackPrismaRepository } from '@/infra/db'

export const makeLoadFeedbacks = (): LoadFeedbacks => {
  const feedbackRepository = new FeedbackPrismaRepository()
  return new DbLoadFeedbacks(feedbackRepository)
}
