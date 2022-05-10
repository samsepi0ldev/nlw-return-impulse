import { HttpResponse, StatusCode } from '@/presentation/protocols/http'
import { ServerError } from '@/presentation/errors'

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: StatusCode.ok,
  body: data
})

export const created = (): HttpResponse => ({
  statusCode: StatusCode.created,
  body: null
})

export const noContent = (): HttpResponse => ({
  statusCode: StatusCode.noContent,
  body: null
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: StatusCode.badRequest,
  body: error
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: StatusCode.serverError,
  body: new ServerError(error instanceof Error ? error : undefined)
})
