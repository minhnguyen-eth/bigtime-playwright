import { APIRequestContext, request } from '@playwright/test';
import { AuthAPI } from './auth/auth.api';
import { PaysheetAPI } from './paysheet/paysheet.api';
import Config from '../utils/configUtils';

/**
 * APIClient - Main API client that aggregates all API modules
 * Provides centralized access to all API endpoints
 */
export class APIClient {
  private requestContext: APIRequestContext;
  private baseURL: string;

  // API modules
  public auth: AuthAPI;
  public paysheet: PaysheetAPI;


  constructor(requestContext: APIRequestContext, baseURL?: string) {
    this.requestContext = requestContext;
    this.baseURL = baseURL || Config.urlStaging;

    // Initialize all API modules
    this.auth = new AuthAPI(this.requestContext, this.baseURL);
    this.paysheet = new PaysheetAPI(this.requestContext, this.baseURL);
  }

  /**
   * Create a new API client instance
   */
  static async create(baseURL?: string): Promise<APIClient> {
    const requestContext = await request.newContext({
      baseURL: baseURL || Config.urlStaging,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });

    return new APIClient(requestContext, baseURL);
  }

  /**
   * Set authentication token for all API modules
   */
  setToken(token: string) {
    this.auth.setToken(token);
    this.paysheet.setToken(token);
  }

  /**
   * Login and set token automatically
   */
  async login(username: string, password: string, remember: boolean = true) {
    const response = await this.auth.login(username, password, remember);

    if (response.code === 200 && response.data.access_token) {
      this.setToken(response.data.access_token);
    }

    return response;
  }

  /**
   * Logout and clear token
   */
  async logout() {
    const response = await this.auth.logout();
    this.setToken('');
    return response;
  }

  /**
   * Dispose the API client and close request context
   */
  async dispose() {
    await this.requestContext.dispose();
  }
}

/**
 * Helper function to create authenticated API client
 */
export async function createAuthenticatedAPIClient(
  username: string,
  password: string,
  baseURL?: string
): Promise<APIClient> {
  const client = await APIClient.create(baseURL);
  await client.login(username, password);
  return client;
}

/**
 * Helper function to create API client for admin
 */
export async function createAdminAPIClient(baseURL?: string): Promise<APIClient> {
  return createAuthenticatedAPIClient(
    Config.admin_username,
    Config.admin_password,
    baseURL
  );
}

/**
 * Helper function to create API client for manager
 */
export async function createManagerAPIClient(baseURL?: string): Promise<APIClient> {
  return createAuthenticatedAPIClient(
    Config.manager_department_username,
    Config.manager_department_password,
    baseURL
  );
}

/**
 * Helper function to create API client for employee
 */
export async function createEmployeeAPIClient(baseURL?: string): Promise<APIClient> {
  return createAuthenticatedAPIClient(
    Config.employee_username,
    Config.employee_password,
    baseURL
  );
}

