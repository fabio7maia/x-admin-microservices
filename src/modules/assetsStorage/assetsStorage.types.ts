export interface FileUpload {
  uid: string;
  name: string;
  size: number;
  base64: string;
  url: string;
}

export interface AssetStorageSuccessResponse extends Record<string, any> {
  identifier: string;
  url: string;
}

export interface AssetStorageErrorResponse extends Record<string, any> {
  code: string;
  message: string;
  exception: any;
}
