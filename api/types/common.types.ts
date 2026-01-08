/**
 * Common API Response Types for BigTime API
 * 
 * All BigTime API responses follow this format:
 * {
 *   code: number,
 *   message: string,
 *   data: T
 * }
 */

/**
 * Base API Response structure
 */
export interface BaseAPIResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * Success response helper
 */
export function isSuccessResponse(response: BaseAPIResponse<any>): boolean {
  return response.code === 200;
}

/**
 * Extract data from response
 */
export function extractData<T>(response: BaseAPIResponse<T>): T {
  if (!isSuccessResponse(response)) {
    throw new Error(`API Error: ${response.message} (Code: ${response.code})`);
  }
  return response.data;
}

