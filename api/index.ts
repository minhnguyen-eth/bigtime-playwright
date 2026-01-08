/**
 * API Testing Layer - Main Export File
 * 
 * This file exports all API modules and utilities for easy import
 * 
 * @example
 * ```typescript
 * import { APIClient, createAdminAPIClient } from './api';
 * 
 * const adminAPI = await createAdminAPIClient();
 * const employees = await adminAPI.employee.getEmployees();
 * ```
 */

// Base API
export { BaseAPI } from './base.api';

// Main API Client
export { 
  APIClient,
  createAuthenticatedAPIClient,
  createAdminAPIClient,
  createManagerAPIClient,
  createEmployeeAPIClient,
} from './api.client';

// Auth API
export { 
  AuthAPI,
  type LoginResponse,
  type LogoutResponse,
  type RefreshTokenResponse,
} from './auth/auth.api';

// Paysheet API
export {
  PaysheetAPI,
  type Paysheet,
  type CreatePaysheetRequest,
  type UpdatePaysheetRequest,
  type PaysheetListResponse,
  type PaysheetResponse,
} from './paysheet/paysheet.api';


