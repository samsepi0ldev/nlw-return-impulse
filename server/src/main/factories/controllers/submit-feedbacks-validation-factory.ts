import { Validator } from '@/presentation/protocols'
import { ValidationComposite } from '@/validations/composite'
import { Required } from '@/validations/required-fields'

export const makeSubmitFeedbacksValidation = (): ValidationComposite => {
  const validations: Validator[] = []
  for (const field of ['type', 'comment']) {
    validations.push(new Required(field))
  }

  return new ValidationComposite(validations)
}
