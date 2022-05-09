import { SubmitFeedback } from '@/domain/use-cases'
import { SubmitFeedbackController } from '@/presentation/controllers'
import { Validator } from '@/presentation/protocols'
import { badRequest, created, serverError } from '@/presentation/helpers'
import { InvalidImageError } from '@/presentation/erros'

const throwError = (): never => {
  throw new Error()
}

class ValidationSpy implements Validator {
  error: Error | undefined = undefined
  input: any
  validate (input: any): Error | undefined {
    this.input = input
    return this.error
  }
}

class SubmitFeedbackSpy implements SubmitFeedback {
  input: SubmitFeedback.Input | undefined
  response = true

  async execute (input: SubmitFeedback.Input): Promise<SubmitFeedback.Output> {
    this.input = input
    return this.response
  }
}

interface SutTypes {
  sut: SubmitFeedbackController
  validationSpy: ValidationSpy
  submitFeedbackSpy: SubmitFeedbackSpy
}
const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const submitFeedbackSpy = new SubmitFeedbackSpy()
  const sut = new SubmitFeedbackController(validationSpy, submitFeedbackSpy)
  return {
    sut,
    submitFeedbackSpy,
    validationSpy
  }
}

const makeFakeRequest = {
  body: {
    type: 'BUG',
    comment: 'Any bug in you system!',
    screenshot: 'data:image/png;base64,any'
  }
}

describe('SubmitFeedbackController', () => {
  it('should by return return status code 201', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeRequest)
    expect(response).toEqual(created())
  })
  it('should return bad request 400 if input error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const response = await sut.handle(makeFakeRequest)
    expect(response).toEqual(badRequest(new Error()))
  })
  it('should return server error', async () => {
    const { sut, submitFeedbackSpy } = makeSut()
    jest.spyOn(submitFeedbackSpy, 'execute').mockImplementationOnce(throwError)
    const response = await sut.handle(makeFakeRequest)
    expect(response).toEqual(serverError(new Error()))
  })
  it('should return invalid image', async () => {
    const { sut, submitFeedbackSpy } = makeSut()
    submitFeedbackSpy.response = false
    const response = await sut.handle(makeFakeRequest)
    expect(response).toEqual(badRequest(new InvalidImageError()))
  })
})
