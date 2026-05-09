
import { LoginPage } from '../../../pages/LoginPage';
import Config from '../../../utils/configUtils';
import { PaysheetPage } from '../../../pages/salary_page/PaysheetPage';
import { allure } from 'allure-playwright';
import { clearPaysheets } from '../../../db/modules/PaysheetDB';
import { importCheckTime } from '../../../db/modules/CheckTimeDB';
import { importCheckDay } from '../../../db/modules/CheckDayDB';
import { importPayrolls } from '../../../db/modules/PayrollsDB';
import { expect } from '../../ui/base-test';
import { apiTest as test } from '../../api/api-test';
import { generateCustomPaysheet } from '../../api/helpers/paysheet.helper';
import { TestUsers } from '../../api/test-data/test-users';

test.describe.serial('Salary Calculation Tests', () => {
    const START_DATE_DECEMBER = '2025-12-01';
    const END_DATE_DECEMBER = '2025-12-31';

    let loginPage: LoginPage;
    let paysheet: PaysheetPage;

    test.beforeAll(async () => {
        allure.epic('Hybrid Testing');
        allure.feature('Salary Calculation Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        await clearPaysheets();
        await importCheckTime();
        await importCheckDay();
        await importPayrolls();
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        paysheet = new PaysheetPage(page);
    });

    async function beforeTest() {
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await paysheet.clickSalary();
        await paysheet.clickPaysheet();
        await paysheet.clickLatestPaysheetRow();
        await paysheet.clickViewPayroll();
    }

    /* Test thuế nhân viên có 1 người phụ thuộc */
    test('TC_Paysheet_API_002 - E2E Calculate tax with 1 dependents - Kiểm tra tính thuế khi có 1 người phụ thuộc', async ({ adminAPI }) => {
        allure.story('Calculate tax with 1 dependents Story');
        allure.description(`
        Employee: BAT101 (1 dependent)
        Payroll month: 12/2025
        Base salary: 20,000,000 VND
        Dependent deduction start date: 15/12/2025
        Insurance deduction: 2.100.000 VND (20.000.000 * (BHXH 8%) + (BHYT 1.5%) + (BHTN 1%) + (ĐOÀN PHÍ 0%))
        Personal deduction:  15.500.000 VND
        Dependent deduction: 6.200.000 VND (1 dependent)

        Taxable income: 0 VND

        Expected:
        - Base salary: 20,000,000 VND
        - Tax: 0 VND
        - Insurance deduction: 2.100.000 VND 
        - Net salary: 17,900,000 VND `);

        await allure.step('API - Add paysheet for 1 employees', async () => {
            // Use helper to generate paysheet data
            const paysheetData = generateCustomPaysheet({
                name: 'Automation test 1 dependent',
                start_date: START_DATE_DECEMBER,
                end_date: END_DATE_DECEMBER,
                users_id: [TestUsers.USERID_BAT101_1_DEPENDENT]
            });

            const response = await adminAPI.paysheet.createPaysheet(paysheetData);

            // Verify response format
            expect(response.code).toBe(200);
            expect(response.message).toBe('Created successfully'); // BigTime API message
        });

        await allure.step('UI - Verify salary and tax', async () => {
            await beforeTest();

            // verify salary and tax
            await paysheet.verifyMainSalary('20.000.000');
            await paysheet.verifyTotalSalary('20.000.000');
            await paysheet.verifyInsurance('2.100.000');
            await paysheet.verifyTax('0');
            await paysheet.verifyTotalReceived('17.900.000');
        });
    });

    /* Test thuế nhân viên có 2 người phụ thuộc */
    test('E2E Calculate tax with 2 dependents - Kiểm tra tính thuế với 2 người phụ thuộc ', async ({ adminAPI }) => {
        allure.story('Calculate tax with 2 dependents Story');
        allure.description(`
        Employee: BAT102
        Payroll month: 12/2025
        Base salary: 30,000,000 VND
        Dependent deduction start date: 15/12/2025

        Insurance deduction: 3.150.000 VND (30.000.000 * (BHXH 8%) + (BHYT 1.5%) + (BHTN 1%) + (ĐOÀN PHÍ 0%))
        Personal deduction: 15.500.000 VND
        Dependent deduction: 12.400.000 VND (2 dependents)

        Expected:
        - Base salary: 30,000,000 VND
        - Insurance deduction: 3.150.000 VND 
        - Tax: 0 VND
        - Net salary: 26,850,000 VND
        `);

        await allure.step('API - Add paysheet for 1 employees', async () => {
            // Use helper to generate paysheet data
            const paysheetData = generateCustomPaysheet({
                name: 'Automation test 2 dependent',
                start_date: START_DATE_DECEMBER,
                end_date: END_DATE_DECEMBER,
                users_id: [TestUsers.USERID_BAT102_2_DEPENDENT]
            });

            const response = await adminAPI.paysheet.createPaysheet(paysheetData);

            // Verify response format
            expect(response.code).toBe(200);
            expect(response.message).toBe('Created successfully'); // BigTime API message
        });

        await allure.step('Verify salary and tax', async () => {
            await beforeTest();
            await paysheet.verifyMainSalary('30.000.000');
            await paysheet.verifyTotalSalary('30.000.000');
            await paysheet.verifyInsurance('3.150.000');
            await paysheet.verifyTax('0');
            await paysheet.verifyTotalReceived('26.850.000');
        });
    });

    // /* Test thuế nhân viên có phát sinh người phụ thuộc giữa tháng */
    // test('E2E Calculate tax with dependents in the middle of the month - Kiểm tra tính thuế khi phát sinh NPT giữa tháng', async ({ adminAPI }) => {
    //     allure.description(`
    //     Employee: BAT107
    //     Payroll month: 12/2025
    //     Base salary: 20,000,000 VND
    //     Dependent deduction start date: 15/12/2025

    //     Insurance deduction: 2,100,000 VND (20.000.000 * (BHXH 8%) + (BHYT 1.5%) + (BHTN 1%) + (ĐOÀN PHÍ 0%))
    //     Personal deduction: 15,500,000 VND (free tax)
    //     Dependent deduction: 6,200,000 VND (1 dependent)

    //     Expected:
    //     - Tax: 0 VND
    //     - Insurance deduction: 2,100,000 VND 
    //     - Net salary: 17,775,000 VND
    //     `);

    //     await allure.step('API - Add paysheet for 1 employees', async () => {
    //         // Use helper to generate paysheet data
    //         const paysheetData = generateCustomPaysheet({
    //             name: 'Automation test NPT generated in the middle of the month',
    //             start_date: START_DATE_DECEMBER,
    //             end_date: END_DATE_DECEMBER,
    //             users_id: [TestUsers.USERID_BAT107_NPT_GENERATED_IN_THE_MIDDLE_OF_THE_MONTH]
    //         });

    //         const response = await adminAPI.paysheet.createPaysheet(paysheetData);

    //         // Verify response format
    //         expect(response.code).toBe(200);
    //         expect(response.message).toBe('Created successfully'); // BigTime API message
    //     });

    //     await allure.step('UI - Verify salary and tax', async () => {
    //         await beforeTest();
    //         // verify salary and tax
    //         await paysheet.verifyMainSalary('20.000.000');
    //         await paysheet.verifyTotalSalary('20.000.000');
    //         await paysheet.verifyInsurance('2.100.000');
    //         await paysheet.verifyTax('0');
    //         await paysheet.verifyTotalReceived('17.900.000');

    //     });
    // });

    // /* Test thuế nhân viên có người phụ thuộc hết hạn giảm trừ giữa tháng */
    // test('E2E Calculate tax with dependents expired in the middle of the month - Kiểm tra tính thuế kh NPT hết hạn giảm trừ giữa tháng', async ({ adminAPI }) => {
    //     allure.description(`
    //     Employee: BAT108
    //     Payroll month: 12/2025
    //     Base salary: 20,000,000 VND
    //     Dependent deduction start date: 15/12/2025

    //     Expected:
    //     - Tax: 0 VND
    //     - Insurance deduction: 2,100,000 VND 
    //     - Net salary: 17,900,000 VND
    //     `);

    //     await allure.step('API - Add paysheet for 1 employees', async () => {
    //         // Use helper to generate paysheet data
    //         const paysheetData = generateCustomPaysheet({
    //             name: 'Automation test NPT generated in the middle of the month',
    //             start_date: START_DATE_DECEMBER,
    //             end_date: END_DATE_DECEMBER,
    //             users_id: [TestUsers.USERID_BAT108_NPT_ENDING_IN_THE_MIDDLE_OF_THE_MONTH]
    //         });

    //         const response = await adminAPI.paysheet.createPaysheet(paysheetData);

    //         // Verify response format
    //         expect(response.code).toBe(200);
    //         expect(response.message).toBe('Created successfully'); // BigTime API message
    //     });

    //     await allure.step('Add paysheet for 1 employees', async () => {

    //         await beforeTest();
    //         // verify salary and tax
    //         await paysheet.verifyMainSalary('20.000.000');
    //         await paysheet.verifyTotalSalary('20.000.000');
    //         await paysheet.verifyInsurance('2.100.000');
    //         await paysheet.verifyTax('0');
    //         await paysheet.verifyTotalReceived('17.900.000');

    //     });

    // });

    // /*  Chưa đến ngày giảm trừ NPT */
    // test('E2E Calculate tax with dependents not yet effective - Kiểm tra tính thuế khi chưa đến ngày giảm trừ NPT', async ({ adminAPI }) => {
    //     allure.story('Calculate tax with dependents not yet effective Story');
    //     allure.description(`
    //     Employee: BAT105
    //     Payroll month: 12/2025
    //     Base salary: 20,000,000 VND
    //     Dependent deduction effective date: 30/09/2026


    //     Expected result:
    //     - Tax: 120,000 VND
    //     - Total insurance: 2,100,000 VND
    //     - Net salary: 17,780,000 VND`);

    //     await allure.step('API - Add paysheet for 1 employees', async () => {
    //         // Use helper to generate paysheet data
    //         const paysheetData = generateCustomPaysheet({
    //             name: 'Automation test NPT not yet effective',
    //             start_date: START_DATE_DECEMBER,
    //             end_date: END_DATE_DECEMBER,
    //             users_id: [TestUsers.USERID_BAT105_1_DEPENDENT_NOT_YET_DEDUCTION_DAY]
    //         });

    //         const response = await adminAPI.paysheet.createPaysheet(paysheetData);

    //         // Verify response format
    //         expect(response.code).toBe(200);
    //         expect(response.message).toBe('Created successfully');
    //     });

    //     await allure.step('UI - Verify salary and tax', async () => {
    //         await beforeTest();

    //         // verify salary and tax
    //         await paysheet.verifyMainSalary('20.000.000');
    //         await paysheet.verifyTotalSalary('20.000.000');
    //         await paysheet.verifyInsurance('2.100.000');
    //         await paysheet.verifyTax('120.000');
    //         await paysheet.verifyTotalReceived('17.780.000');

    //     });

    // });

    // /* Đã hết hạn giảm trừ NPT */
    // test('E2E Calculate tax with dependents expired - Kiểm tra tính thuế khi NPT hết hạn giảm trừ', async ({ adminAPI }) => {
    //     allure.story('Calculate tax with dependents expired Story');
    //     allure.description(`
    //     Employee: BAT106 ( 1 NPT, hết hạn giảm trừ 01/11/2025)
    //     Payroll month: 12/2025
    //     Base salary: 20,000,000 VND
    //     Dependent deduction expiry date: 01/11/2025

    //     Expected result:
    //     - Tax: 120,000 VND
    //     - Insurance deduction: 2,100,000 VND 
    //     - Net salary: 17,780,000 VND
    //     `);

    //     await allure.step('API - Add paysheet for 1 employees', async () => {
    //         // Use helper to generate paysheet data
    //         const paysheetData = generateCustomPaysheet({
    //             name: 'Automation test NPT expired',
    //             start_date: START_DATE_DECEMBER,
    //             end_date: END_DATE_DECEMBER,
    //             users_id: [TestUsers.USERID_BAT106_EXPIRED_DEPENDENT]
    //         });

    //         const response = await adminAPI.paysheet.createPaysheet(paysheetData);

    //         // Verify response format
    //         expect(response.code).toBe(200);
    //         expect(response.message).toBe('Created successfully'); // BigTime API message

    //     });

    //     await allure.step('UI - Verify salary and tax', async () => {
    //         await beforeTest();

    //         // verify salary and tax`
    //         await paysheet.verifyMainSalary('20.000.000');
    //         await paysheet.verifyTotalSalary('20.000.000');
    //         await paysheet.verifyInsurance('2.100.000');
    //         await paysheet.verifyTax('120.000');
    //         await paysheet.verifyTotalReceived('17.780.000');

    //     });
    // });

    // /* Test tính lương cho nhân viên có 1 ngày nghỉ phép năm */
    // test('E2E Calculate salary with 1 day annual leave - Kiểm tra tính lương khi có 1 ngày nghỉ phép năm ', async ({ adminAPI }) => {
    //     allure.story('Calculate salary with 1 day leave Story');
    //     allure.description(`
    //     Employee: BAT400 (1 ngày nghỉ phép năm)
    //     Payroll month: 12/2025
    //     Base salary: 10,000,000 VND

    //     Expected result:
    //     - Tax: 0 VND
    //     - Insurance deduction: 1.050.000 VND 
    //     - Net salary: 8,950,000 VND
    //     `);
    //     await allure.step('API - Add paysheet for 1 employees', async () => {
    //         // Use helper to generate paysheet data
    //         const paysheetData = generateCustomPaysheet({
    //             name: 'Automation test 1 day annual leave',
    //             start_date: START_DATE_DECEMBER,
    //             end_date: END_DATE_DECEMBER,
    //             users_id: [TestUsers.USERID_BAT400_1_ANNUAL_LEAVE]
    //         });

    //         const response = await adminAPI.paysheet.createPaysheet(paysheetData);

    //         // Verify response format
    //         expect(response.code).toBe(200);
    //         expect(response.message).toBe('Created successfully'); // BigTime API message
    //     });

    //     await allure.step('UI - Verify salary and tax', async () => {
    //         await beforeTest();

    //         // verify salary
    //         await paysheet.verifyMainSalary('10.000.000');
    //         await paysheet.verifyTotalSalary('10.000.000');
    //         await paysheet.verifyInsurance('1.050.000');
    //         await paysheet.verifyTax('0');
    //         await paysheet.verifyTotalReceived('8.950.000');

    //     });
    // });

    // /* Test tính lương cho nhân viên có 1 ngày nghỉ thường */
    // test('E2E Calculate salary with 1 day regular leave - Kiểm tra tính lương khi có 1 ngày nghỉ thường ', async ({ adminAPI }) => {
    //     allure.story('Calculate salary with 1 day regular leave Story');
    //     allure.description(`
    //     Employee: BAT402
    //     Payroll month: 12/2025
    //     Base salary: 10,000,000 VND
    //     Standard work: 2
    //     Working days: 1
    //     Regular leave: 1 day

    //     Expected:
    //     Main salary: 5,000,000 VND
    //     Insurance deduction: 1.050.000 VND
    //     Net salary: 3,950,000 VND
    //     `)

    //     await allure.step('API - Add paysheet for 1 employees', async () => {
    //         // Use helper to generate paysheet data
    //         const paysheetData = generateCustomPaysheet({
    //             name: 'Automation test 1 day annual leave',
    //             start_date: START_DATE_DECEMBER,
    //             end_date: END_DATE_DECEMBER,
    //             users_id: [TestUsers.USERID_BAT402_1_REGULAR_LEAVE]
    //         });

    //         const response = await adminAPI.paysheet.createPaysheet(paysheetData);

    //         // Verify response format
    //         expect(response.code).toBe(200);
    //         expect(response.message).toBe('Created successfully'); // BigTime API message 
    //     });

    //     await allure.step('UI - Verify salary and tax', async () => {
    //         await beforeTest();

    //         // verify salary
    //         await paysheet.verifyMainSalary('5.000.000');
    //         await paysheet.verifyTotalSalary('5.000.000');
    //         await paysheet.verifyInsurance('1.050.000');
    //         await paysheet.verifyTax('0');
    //         await paysheet.verifyTotalReceived('3.950.000');

    //     });
    // });

    /* Test thuế nhân viên có 0 người phụ thuộc */
    test('TC_Paysheet_API_001 - Calculate tax with 0 dependents - Kiểm tra tính thuế khi có 0 người phụ thuộc', async ({ adminAPI }) => {
        allure.story('Calculate tax with 1 dependents Story');
        allure.description(`
        Employee: BAT100 No dependent
        Payroll month: 12/2025
        Base salary: 14,000,000 VND
        Allowance: 3,000,000 VND
        Dependent deduction start date: 15/12/2025

        Insurance deduction: 1,493,400 VND (30.000.000 * (BHXH 8%) + (BHYT 1.5%) + (BHTN 1%) + (ĐOÀN PHÍ 1%))
        Personal deduction: 1.610.000 VND
        Dependent deduction: 0 VND (0 dependents)

        Taxable income: 0 VND
        Tax: 0 VND

        Expected:
        - Dependent deduction is applied
        - Net salary: 15,506,600 VND
        `);

        await allure.step('API - Add paysheet for 1 employees', async () => {
            // Use helper to generate paysheet data
            const paysheetData = generateCustomPaysheet({
                name: 'Automation test 0 dependent',
                start_date: START_DATE_DECEMBER,
                end_date: END_DATE_DECEMBER,
                users_id: [TestUsers.USERID_BAT100_NO_DEPENDENT]
            });

            const response = await adminAPI.paysheet.createPaysheet(paysheetData);

            // Verify response format
            expect(response.code).toBe(200);
            expect(response.message).toBe('Created successfully');
        });

        await allure.step('UI - Verify salary and tax', async () => {
            await beforeTest();

            // verify salary and tax
            await paysheet.verifyMainSalary('14.000.000');
            await paysheet.verifyTotalSalary('17.000.000');
            await paysheet.verifyInsurance('1.610.000');
            await paysheet.verifyTax('0');
            await paysheet.verifyTotalReceived('14.390.000');
        });
    });
});
