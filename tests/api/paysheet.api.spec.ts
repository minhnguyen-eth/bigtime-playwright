import { apiTest as test, expect } from './api-test';
import { allure } from 'allure-playwright';
import {
  generatePaysheetData,
  generatePaysheetForEmployees,
  generatePaysheetForAllUsers,
  generatePaysheetByDepartment,
  generateCustomPaysheet,
} from './helpers/paysheet.helper';
import { TestUsers } from './test-data/test-users';
import { clearPaysheets } from '../../db/helpers/DBHelper';
import { importCheckTime } from '../../db/modules/CheckTimeDB';
import { importPayrolls } from '../../db/modules/PayrollsDB';
import { importCheckDay } from '../../db/modules/CheckDayDB';

test.describe('Paysheet API Tests', () => {
  let createdPaysheetId: string;

  test.beforeEach(async () => {
    allure.epic('API Testing');
    allure.feature('Paysheet Management');

    // Import data for paysheet calculation
    await clearPaysheets();
    await importCheckTime();
    await importCheckDay();
    await importPayrolls();
  });

  // test.afterEach(async ({ adminAPI }) => {
  //   // Cleanup created paysheet
  //   if (createdPaysheetId) {
  //     try {
  //       await adminAPI.paysheet.cancelPaysheet(createdPaysheetId, 'Test cleanup');
  //     } catch (error) {
  //       console.log('Cleanup error:', error);
  //     }
  //   }
  // });

  test('should create new paysheet successfully', async ({ adminAPI }) => {
    allure.story('Create new paysheet');
    allure.severity('critical');

    // Use helper to generate paysheet data
    const paysheetData = generateCustomPaysheet({
      name: 'Paysheet 1–15 Nov',
      start_date: '2025-12-01',
      end_date: '2025-12-31',
      users_id: [TestUsers.USERID_BAT100_NO_DEPENDENT]
    });

    const response = await adminAPI.paysheet.createPaysheet(paysheetData);

    // Verify response format
    expect(response.code).toBe(200);
    expect(response.message).toBe('Created successfully'); // BigTime API message
    expect(response.data).toBeDefined();
    expect(typeof response.data).toBe('string'); // Returns ID as string

    createdPaysheetId = response.data; // Save ID 

    console.log('Paysheet created successfully');
    console.log('Paysheet ID:', createdPaysheetId);
  });

  test('should cancel paysheet successfully', async ({ adminAPI }) => {
    allure.story('Cancel paysheet');
    allure.severity('critical');

    // First create a paysheet
    const paysheetData = generateCustomPaysheet({
      name: 'Paysheet to Cancel',
      start_date: '2025-12-01',
      end_date: '2025-12-31',
      users_id: [TestUsers.USERID_BAT100_NO_DEPENDENT]
    });

    const createResponse = await adminAPI.paysheet.createPaysheet(paysheetData);
    expect(createResponse.code).toBe(200);

    createdPaysheetId = createResponse.data;
    console.log('Created paysheet to cancel:', createdPaysheetId);

    // Then cancel it
    const cancelResponse = await adminAPI.paysheet.cancelPaysheet(
      createdPaysheetId,
      'Test cancellation reason'
    );

    // Verify cancel response
    expect(cancelResponse.code).toBe(200);
    expect(cancelResponse.message).toBeDefined();

    console.log('Paysheet cancelled successfully');
    console.log('Cancel response:', cancelResponse);
  });

  test('should cancel paysheet with no reason', async ({ adminAPI }) => {
    allure.story('Cancel paysheet with no reason');
    allure.severity('normal');

    // Create paysheet
    const paysheetData = generateCustomPaysheet({
      name: 'Paysheet Custom Cancel',
      start_date: '2025-12-01',
      end_date: '2025-12-31',
      users_id: [TestUsers.USERID_BAT100_NO_DEPENDENT]
    });

    const createResponse = await adminAPI.paysheet.createPaysheet(paysheetData);
    expect(createResponse.code).toBe(200);

    createdPaysheetId = createResponse.data;

    const cancelResponse = await adminAPI.paysheet.cancelPaysheet(
      createdPaysheetId,
      ''
    );
    expect(cancelResponse.message).toBe('Cancel reason is required');

    console.log('Response:', cancelResponse);
  });

});
