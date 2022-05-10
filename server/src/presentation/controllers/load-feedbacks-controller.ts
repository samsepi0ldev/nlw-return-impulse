import { LoadFeedbacks } from '@/domain/use-cases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helpers'

export class LoadFeedbacksController implements Controller {
  constructor (private readonly loadFeedbacks: LoadFeedbacks) {}

  async handle (_: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const feedbacks = await this.loadFeedbacks.load()
      return feedbacks.length ? ok(feedbacks) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
