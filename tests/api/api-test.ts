import { test as base, expect } from '@playwright/test';
import { APIClient, createAdminAPIClient, createManagerAPIClient, createEmployeeAPIClient } from '../../api/api.client';

/**
 * Extended test fixtures with API clients
 */
type APITestFixtures = {
  apiClient: APIClient;
  adminAPI: APIClient;
  managerAPI: APIClient;
  employeeAPI: APIClient;
};

/**
 * API Test - Extended test with API client fixtures
 */
export const apiTest = base.extend<APITestFixtures>({
  /**
   * Generic API client (not authenticated)
   */
  apiClient: async ({ request }, use) => {
    const client = new APIClient(request);
    await use(client);
    await client.dispose();
  },

  /**
   * Admin API client (authenticated as admin)
   */
  adminAPI: async ({}, use) => {
    const client = await createAdminAPIClient();
    await use(client);
    await client.dispose();
  },

  /**
   * Manager API client (authenticated as manager)
   */
  managerAPI: async ({}, use) => {
    const client = await createManagerAPIClient();
    await use(client);
    await client.dispose();
  },

  /**
   * Employee API client (authenticated as employee)
   */
  employeeAPI: async ({}, use) => {
    const client = await createEmployeeAPIClient();
    await use(client);
    await client.dispose();
  },
});

export { expect };

