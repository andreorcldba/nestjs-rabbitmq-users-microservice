export interface ResponseMessage {
  [key: number|string]: {
    statusCode: number;
    message: string | string[];
    error: string;
  }
}
