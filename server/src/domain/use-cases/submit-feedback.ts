export interface SubmitFeedback {
  execute: (input: SubmitFeedback.Input) => Promise<SubmitFeedback.Output>
}

export namespace SubmitFeedback {
  export interface Input {
    type: string
    comment: string
    screenshot?: string
  }
  export type Output = boolean
}
