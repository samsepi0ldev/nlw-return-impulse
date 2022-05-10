import { SubmitFeedbackRepository, LoadFeedbacksRepository } from '@/data/protocols/db'
import { LoadFeedbacks, SubmitFeedback } from '@/domain/use-cases'
import { prisma } from '@/main/prisma'

export class FeedbackPrismaRepository implements SubmitFeedbackRepository, LoadFeedbacksRepository {
  async create (input: SubmitFeedback.Input): Promise<void> {
    await prisma.feedback.create({ data: input })
  }

  async load (): Promise<LoadFeedbacks.Output> {
    const feedbacks = await prisma.feedback.findMany()
    return feedbacks
  }
}
