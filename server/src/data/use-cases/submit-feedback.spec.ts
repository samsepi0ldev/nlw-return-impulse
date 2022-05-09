import { DbSubmitFeedback } from '@/data/use-cases'
import { SubmitFeedbackRepository } from '@/data/protocols/db'
import { SubmitFeedback } from '@/domain/use-cases'

const throwError = (): never => {
  throw new Error()
}

class SubmitFeedbackRepositorySpy implements SubmitFeedbackRepository {
  input: SubmitFeedback.Input | undefined
  async create (input: SubmitFeedback.Input): Promise<void> {
    this.input = input
  }
}

interface SutTypes {
  sut: DbSubmitFeedback
  submitFeedbackRepositorySpy: SubmitFeedbackRepositorySpy
}

const makeSut = (): SutTypes => {
  const submitFeedbackRepositorySpy = new SubmitFeedbackRepositorySpy()
  const sut = new DbSubmitFeedback(submitFeedbackRepositorySpy)
  return {
    sut,
    submitFeedbackRepositorySpy
  }
}

const makeFakeRequest = {
  type: 'BUG',
  comment: 'Any bug in you system!'
}

describe('DbSubmitFeedback', () => {
  it('should throw on create feedback', async () => {
    const { sut, submitFeedbackRepositorySpy } = makeSut()
    jest.spyOn(submitFeedbackRepositorySpy, 'create').mockImplementation(throwError)
    const res = sut.execute(makeFakeRequest)
    await expect(res).rejects.toThrow()
  })
  it('should return true if success', async () => {
    const { sut } = makeSut()
    const res = await sut.execute(makeFakeRequest)
    expect(res).toBeTruthy()
  })
  it('should submitFeedbackRepository called with correct values', async () => {
    const { sut, submitFeedbackRepositorySpy } = makeSut()
    const spy = jest.spyOn(submitFeedbackRepositorySpy, 'create')
    await sut.execute(makeFakeRequest)
    expect(spy).toHaveBeenCalledWith(makeFakeRequest)
  })
  it('should return false invalid image', async () => {
    const { sut } = makeSut()
    const res = await sut.execute({
      ...makeFakeRequest,
      screenshot: 'any'
    })
    expect(res).toBeFalsy()
  })
})
