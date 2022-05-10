import { Feedback } from '../models/feedback'

export interface LoadFeedbacks {
  load: () => Promise<LoadFeedbacks.Output>
}

export namespace LoadFeedbacks {
  export type Output = Feedback[]
}
