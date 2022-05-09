export const env = {
  transporter: process.env.transporter ?? {
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
      user: '79c476cc7f80e1',
      pass: '6a8043d5ebb25d'
    }
  }
} as any
