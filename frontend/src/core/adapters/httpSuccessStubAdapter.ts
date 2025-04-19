import { HttpPort } from '../ports/httpPort';

/**
 * A stub adapter that simulates successful HTTP responses
 */
export class HttpSuccessStubAdapter implements HttpPort {
  private defaultResponse: any;

  constructor(defaultResponse: any = {}) {
    this.defaultResponse = defaultResponse;
  }

  /**
   * Simulates a successful GET request
   * @param url The URL being requested
   * @param headers Optional headers
   * @returns A promise that resolves with the default success response
   */
  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    console.log(`[HttpSuccessStub] GET request to ${url}`, { headers });
    return Promise.resolve(this.defaultResponse as T);
  }

  /**
   * Simulates a successful POST request
   * @param url The URL being requested
   * @param body The request body
   * @param headers Optional headers
   * @returns A promise that resolves with the default success response
   */
  async post<T>(url: string, body: any, headers?: Record<string, string>): Promise<T> {
    console.log(`[HttpSuccessStub] POST request to ${url}`, { body, headers });
    return Promise.resolve(this.defaultResponse as T);
  }
} 