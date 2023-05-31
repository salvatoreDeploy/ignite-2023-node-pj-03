export class LateCheckinValidationErrors extends Error {
  constructor() {
    super('The check cannot be validated 20 minutes after its creation')
  }
}
