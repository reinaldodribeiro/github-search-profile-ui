export interface HttpConfig<T = any> {
    params?: T;
    headers?: any;
    onUploadProgress?: (progressEvent: ProgressEvent) => void;
    onDownloadProgress?: (progressEvent: ProgressEvent) => void;
}
