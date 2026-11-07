export default class ApiError extends Error {
  public status: number;
  public code?: string;

  constructor(status: number, code?: string, message = 'Something went wrong') {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}
