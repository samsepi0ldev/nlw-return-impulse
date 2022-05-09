export interface SendEmail {
  sendMain: (data: SendEmail.Input) => Promise<void>
}

export namespace SendEmail {
  export interface Input {
    subject: string
    body: string
  }
}
