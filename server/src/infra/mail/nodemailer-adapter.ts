import nodemailer from 'nodemailer'

import { SendEmail } from '@/data/protocols/mail'

export class NodemailerAdapter implements SendEmail {
  constructor (private readonly conf: object) {}

  async sendMain ({ subject, body }: SendEmail.Input): Promise<void> {
    const transporter = nodemailer.createTransport(this.conf)
    await transporter.sendMail({
      from: 'Equipe feedback <test@test.com>',
      to: 'Elivelton Santos <eliveltonjps@gmail.com>',
      subject,
      html: body
    })
  }
}
