import { LoadFeedbacks } from '@/domain/use-cases'

export interface LoadFeedbacksRepository {
  load: () => Promise<LoadFeedbacks.Output>
}
