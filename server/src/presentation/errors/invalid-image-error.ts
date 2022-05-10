export class InvalidImageError extends Error {
  constructor () {
    super('Invalid image')
    this.name = 'InvalidImageError'
  }
}
