import { Controller, HttpResponse, HttpRequest, Validator } from '@/presentation/protocols'
import { badRequest, created, serverError } from '@/presentation/helpers'
import { SubmitFeedback } from '@/domain/use-cases'
import { InvalidImageError } from '@/presentation/errors'

interface FeedbackRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackController implements Controller {
  constructor (
    private readonly validation: Validator,
    private readonly submitFeedback: SubmitFeedback
  ) {}

  async handle (req: HttpRequest<FeedbackRequest>): Promise<HttpResponse> {
    try {
      const { body } = req
      const error = this.validation.validate(body)
      if (error) {
        return badRequest(error)
      }

      const isValid = await this.submitFeedback.execute(body)
      if (!isValid) {
        return badRequest(new InvalidImageError())
      }

      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
