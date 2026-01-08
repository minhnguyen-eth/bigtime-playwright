import { apiTest as test, expect } from './api-test';
import { allure } from 'allure-playwright';
import Config from '../../utils/configUtils';

test.describe('Authentication API Tests', () => {
  test.beforeEach(async () => {
    allure.epic('API Testing');
    allure.feature('Authentication');
  });

  test('should login successfully with valid credentials', async ({ apiClient }) => {
    allure.story('Login with valid credentials');
    allure.severity('critical');

    const response = await apiClient.auth.login(
      Config.admin_username,
      Config.admin_password
    );

    // BigTime API response format
    expect(response.code).toBe(200);
    expect(response.message).toBe('Logged in successfully');
    expect(response.data).toBeDefined();
    expect(response.data.access_token).toBeDefined();
    expect(response.data.id).toBe('0000000000');
    expect(response.data.is_admin).toBe(true);
    expect(response.data.user_type).toBe(0);
  });

  test('should fail login with invalid credentials', async ({ apiClient }) => {
    allure.story('Login with invalid credentials');
    allure.severity('critical');

    const response = await apiClient.auth.login('invalid_user', 'invalid_password');
    expect(response.code).toBe(401);
    expect(response.message).toBe('Invalid username or password');
  });

});

