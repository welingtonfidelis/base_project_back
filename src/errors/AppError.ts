class AppError {
  public readonly message: string | Object;

  public readonly code: number;

  constructor(message: string | Object, code: number) {
    this.message = message;
    this.code = code;
  }
}

export { AppError };
