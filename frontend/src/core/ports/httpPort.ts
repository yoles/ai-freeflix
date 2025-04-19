export interface HttpPort {
  /**
   * Performs an HTTP GET request
   * @param url The URL to request
   * @param headers Optional headers to include in the request
   * @returns A promise that resolves with the response data
   */
  get<T>(url: string, headers?: Record<string, string>): Promise<T>;

  /**
   * Performs an HTTP POST request
   * @param url The URL to request
   * @param body The data to send in the request body
   * @param headers Optional headers to include in the request
   * @returns A promise that resolves with the response data
   */
  post<T, D = unknown>(url: string, body: D, headers?: Record<string, string>): Promise<T>;
} 