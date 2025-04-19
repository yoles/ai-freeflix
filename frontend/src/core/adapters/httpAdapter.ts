import axios, { AxiosInstance } from 'axios';
import { HttpPort } from '../ports/httpPort';

/**
 * Axios implementation of the HttpPort interface
 */
export class HttpAdapter implements HttpPort {
  private client: AxiosInstance;

  /**
   * Creates a new HttpAdapter instance
   * @param baseURL The base URL for all requests (defaults to http://localhost:3000)
   */
  constructor(baseURL: string = 'http://localhost:3000') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Performs an HTTP GET request
   * @param url The URL to request
   * @param headers Optional headers to include in the request
   * @returns A promise that resolves with the response data
   */
  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    try {
      const response = await this.client.get<T>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
      }
      throw error;
    }
  }

  /**
   * Performs an HTTP POST request
   * @param url The URL to request
   * @param body The data to send in the request body
   * @param headers Optional headers to include in the request
   * @returns A promise that resolves with the response data
   */
  async post<T, D = unknown>(url: string, body: D, headers?: Record<string, string>): Promise<T> {
    try {
      const response = await this.client.post<T>(url, body, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
      }
      throw error;
    }
  }
} 