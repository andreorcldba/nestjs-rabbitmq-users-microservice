export interface PgErrorResponseMessage {
  statusCode: number;
  message: string | string[];
  error: string;
}
