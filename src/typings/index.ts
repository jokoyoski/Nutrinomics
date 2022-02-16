export interface IResponse {
  data: {
    accessToken?: string;
    [key: string]: any;
  };
  success: boolean;
}
