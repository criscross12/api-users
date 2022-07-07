export interface HttpError {
  error: string;
  message: string;
  statusCode: number;
  data: any;
}

export interface ICustomMessage {
  error: string;
  message: string;
  statusCode?: number;
  data?: any;
}
