import { HttpPort } from '../ports/httpPort';

/**
 * A stub adapter that simulates failed HTTP responses
 */
export class HttpFailStubAdapter implements HttpPort {
  private error: Error;

  constructor(errorMessage: string = 'Network error') {
    this.error = new Error(errorMessage);
  }

  /**
   * Simulates a failed GET request
   * @param url The URL being requested
   * @param headers Optional headers
   * @returns A promise that rejects with the configured error
   */
  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    console.log(`[HttpFailStub] GET request to ${url}`, { headers });
    return Promise.reject(this.error);
  }

  /**
   * Simulates a failed POST request
   * @param url The URL being requested
   * @param body The request body
   * @param headers Optional headers
   * @returns A promise that rejects with the configured error
   */
  async post<T>(url: string, body: any, headers?: Record<string, string>): Promise<T> {
    console.log(`[HttpFailStub] POST request to ${url}`, { body, headers });
    return Promise.reject(this.error);
  }
} 