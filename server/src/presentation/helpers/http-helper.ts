import { HttpResponse, StatusCode } from '@/presentation/protocols/http'

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: StatusCode.badRequest,
  body: error
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: StatusCode.serverError,
  body: error
})

export const created = (): HttpResponse => ({
  statusCode: StatusCode.created,
  body: null
})
