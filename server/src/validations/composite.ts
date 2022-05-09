import { Validator } from '@/presentation/protocols'

export class ValidationComposite implements Validator {
  constructor (private readonly validators: Validator[]) {}

  validate (input: any): Error | undefined {
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) return error
    }
  }
}
