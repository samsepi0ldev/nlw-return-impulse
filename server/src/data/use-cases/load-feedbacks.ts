import { LoadFeedbacks } from '@/domain/use-cases'
import { LoadFeedbacksRepository } from '@/data/protocols/db'

export class DbLoadFeedbacks implements LoadFeedbacks {
  constructor (private readonly loadFeedbacksRepository: LoadFeedbacksRepository) {}

  async load (): Promise<LoadFeedbacks.Output> {
    return await this.loadFeedbacksRepository.load()
  }
}
