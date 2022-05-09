import { SubmitFeedback } from '@/domain/use-cases'
import { SubmitFeedbackRepository } from '@/data/protocols/db'
import { SendEmail } from '@/data/protocols/mail'

export class DbSubmitFeedback implements SubmitFeedback {
  constructor (
    private readonly submitFeedbackRepository: SubmitFeedbackRepository,
    private readonly mail: SendEmail
  ) {}

  async execute (data: SubmitFeedback.Input): Promise<SubmitFeedback.Output> {
    let isValid = true

    if (data.screenshot && !data.screenshot?.startsWith('data:image/png;base64,')) {
      isValid = false
    }
    await this.submitFeedbackRepository.create(data)

    if (isValid) {
      await this.mail.sendMain({
        subject: 'Novo feedback',
        body: [
          '<div style="font-family: sans-serif; font-size: 16px; color: #181818;">',
          `<p>Tipo de feedback: ${data.type}</p>`,
          `<p>Comentário: ${data.comment}</p>`,
          data.screenshot ? `<img src="${data.screenshot} alt="${data.type}">` : '',
          '</div>'
        ].join('\n')
      })
    }

    return isValid
  }
}
