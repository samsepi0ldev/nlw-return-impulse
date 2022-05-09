export enum StatusCode {
  ok = 200,
  badRequest = 400,
  created = 201,
  noContent = 204,
  serverError = 500
}

export interface HttpRequest<T = any> {
  body: T
}

export interface HttpResponse<T = any> {
  statusCode: number
  body: T
}
