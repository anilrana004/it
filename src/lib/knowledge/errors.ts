export class PostValidationError extends Error {
  readonly fieldErrors: Record<string, string>;

  constructor(message: string, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.name = 'PostValidationError';
    this.fieldErrors = fieldErrors;
  }
}

export function isPostValidationError(error: unknown): error is PostValidationError {
  return error instanceof PostValidationError;
}
