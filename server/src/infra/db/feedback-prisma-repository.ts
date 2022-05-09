import { SubmitFeedbackRepository } from '@/data/protocols/db'
import { SubmitFeedback } from '@/domain/use-cases'
import { prisma } from '@/main/prisma'

export class FeedbackPrismaRepository implements SubmitFeedbackRepository {
  async create (input: SubmitFeedback.Input): Promise<void> {
    await prisma.feedback.create({ data: input })
  }
}
