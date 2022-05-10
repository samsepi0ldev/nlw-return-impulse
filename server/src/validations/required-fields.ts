import { MissingParamError } from '@/presentation/errors'
import { Validator } from '@/presentation/protocols'

export class Required implements Validator {
  constructor (readonly fieldName: string) {}

  validate (input: any): Error | undefined {
    if (!input[this.fieldName] || input[this.fieldName].trim() === '') {
      return new MissingParamError(this.fieldName)
    }
  }
}
