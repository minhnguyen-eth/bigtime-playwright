import { test, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { allure } from 'allure-playwright';
import { EmployeePage } from '../pages/EmployeePage';
import { ToastPage } from '../pages/ToastPage';
import { HomePage } from '../pages/HomePage';

test.describe.serial('Employee Tests', () => {
    let loginPage: LoginPage;
    let employeePage: EmployeePage
    let toastPage: ToastPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Employee Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        toastPage = new ToastPage(page);
        employeePage = new EmployeePage(page);
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginPage.goto();

    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

        test(`Add with role employee`, async ({ page }) => {
            const randomSuffix = Math.random().toString(36).substring(2, 8);
            const randomAllowanceName = `Phụ cấp${randomSuffix}`;
            const userCode = `userCode${randomSuffix}`;
            const emailRandom = `email${randomSuffix}`;
            const random10Digits = Math.floor(1000000000 + Math.random() * 9000000000);
            const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;

            try {
                await loginPage.login(Config.admin_username, Config.admin_password);
                await homePage.clickAdmin();
                await employeePage.clickUser();
                await employeePage.clickAddButton();

                // Fill information
                await employeePage.fillEmployeeCode(userCode);
                await employeePage.fillEmployeeName('Automation test');
                await employeePage.fillEmail(emailRandom);
                await employeePage.clickSelectMale();
                await employeePage.clickDropdownBranch();
                await employeePage.clickSelectBranch();
                await employeePage.clickDropdownDepartment();
                await employeePage.clickSelectDepartment();
                await employeePage.clickDropdownEmployeeType();
                await employeePage.clickStaff();

                await employeePage.clickDropdownPosition();
                await employeePage.clickPosition();
                await employeePage.clickDropdownRank();
                await employeePage.clickSelectRank();
                await employeePage.fillCitizenId(random10Digits);
                await employeePage.clickCitizenIdCardIssueDate();
                await employeePage.clickChosseYear();
                await employeePage.clickSelectYear();
                await employeePage.clickChosseMonth();
                await employeePage.clickSelectMonth();
                await employeePage.clickSelectDay();
                await employeePage.clickChosseButton();

                await employeePage.fillPlaceOfIssueOfIdentityCard('Bien Hoa, Dong Nai');
                await employeePage.fillBankName('Vietcombank');
                await employeePage.fillBankAccountNumber('02847182497124');
                await employeePage.fillPhoneNumber(phoneNumber);
                await employeePage.clickDateOfBirth();
                await employeePage.clickChosseYear();
                await employeePage.clickSelectYear();
                await employeePage.clickChosseMonth();
                await employeePage.clickSelectMonth();
                await employeePage.clickSelectDay();
                await employeePage.clickChosseButton();
                await employeePage.clickDateOfJoiningTheCompany();
                await employeePage.clickToDay();
                await employeePage.clickChosseButton();
                await employeePage.fillAddress('Bien Hoa, Dong Nai');
                await employeePage.fillNote('Automation testing');

                // Set salary 
                await employeePage.clickSetSalary();
                await employeePage.fillFillSalary('22000000');
                await employeePage.fillFillInsurance('500000');
                await employeePage.clickOpenAllowance();
                await employeePage.clickAddAllowance();
                await employeePage.clickDropdownAllowance();
                await employeePage.clickSelectAllowance();

                // await employeePage.clickAddAllowance();
                // await employeePage.clickDropdownAllowance2();
                // await employeePage.clickAddAllowanceTypeButton();
                // await employeePage.fillAllowanceTypeName(randomAllowanceName);
                // await employeePage.fillMoneyAllowance('100000');
                // await employeePage.clickConfirm();

                await employeePage.clickSaveButton();
                await toastPage.getToastAddSuccess();

                //Verify
                await employeePage.clickRow0();
            } catch (error) {
                console.error(`Test failed with error: ${error}`);
                // Pause the test when an error occurs
                await page.pause();
                throw error; // Re-throw to make sure the test still fails
            }
        });
    

    test('Add and set daily salary ', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const randomAllowanceName = `Phụ cấp${randomSuffix}`;
        const userCode = `userCode${randomSuffix}`;
        const emailRandom = `email${randomSuffix}`;

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await employeePage.clickUser();
        await employeePage.clickAddButton();

        // Fill information
        await employeePage.fillEmployeeCode(userCode);
        await employeePage.fillEmployeeName('Automation test');
        await employeePage.fillEmail(emailRandom);
        await employeePage.clickSelectMale();
        await employeePage.clickDropdownBranch();
        await employeePage.clickSelectBranch();
        await employeePage.clickDropdownDepartment();
        await employeePage.clickSelectDepartment();
        await employeePage.clickDropdownEmployeeType();
        await employeePage.clickStaff();

        // Set salary 
        await employeePage.clickSetSalary();
        await employeePage.clickDropdownSalaryType();
        await employeePage.clickDailySalary();
        await employeePage.fillFillSalary('22000000');
        await employeePage.fillFillInsurance('500000');
        await employeePage.clickSaveButton();
        await toastPage.getToastAddSuccess();

        //Verify
        await employeePage.clickRow0();

    });

    test('Add with invalid email', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const userCode = `userCode${randomSuffix}`;
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await employeePage.clickUser();
        await employeePage.clickAddButton();
        await employeePage.fillEmployeeCode(userCode);
        await employeePage.fillEmployeeName('Automation test');
        await employeePage.clickDropdownBranch();
        await employeePage.clickSelectBranch();
        await employeePage.clickDropdownDepartment();
        await employeePage.clickSelectDepartment();
        await employeePage.clickDropdownEmployeeType();
        await employeePage.clickStaff();
        await employeePage.fillEmail('Tét');
        await employeePage.clickSaveButton();
        await employeePage.verifyEmailError();
        await toastPage.getToastAddFailed();

    });

    test('Add with role department management', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const userCode = `userCode${randomSuffix}`;
        const emailRandom = `email${randomSuffix}`;
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await employeePage.clickUser();
        await employeePage.clickAddButton();
        await employeePage.fillEmployeeCode(userCode);
        await employeePage.fillEmployeeName('Automation test');
        await employeePage.fillEmail(emailRandom);
        await employeePage.clickDropdownBranch();
        await employeePage.clickSelectBranch();
        await employeePage.clickDropdownDepartment();
        await employeePage.clickSelectDepartment();
        await employeePage.clickDropdownEmployeeType();
        await employeePage.clickStaff();
        await employeePage.clickDropdownEmployeeType();
        await employeePage.clickAdmin();
        await employeePage.clickDropdownRoleName();
        await employeePage.clickManagementDepartmentRole();

        await employeePage.clickSaveButton();
        await toastPage.getToastAddSuccess();
    });

    test('Add with duplicate employee code and email', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await employeePage.clickUser();
        await employeePage.clickAddButton();
        await employeePage.fillEmployeeCode('BAT810');
        await employeePage.fillEmployeeName('Automation test');
        await employeePage.fillEmail('minh');
        await employeePage.clickDropdownBranch();
        await employeePage.clickSelectBranch();
        await employeePage.clickDropdownDepartment();
        await employeePage.clickSelectDepartment();
        await employeePage.clickDropdownEmployeeType();
        await employeePage.clickStaff();
        await employeePage.clickSaveButton();
        await toastPage.getToastAddFailed();
        await employeePage.verifyEmailExisted();
        await employeePage.verifyEmployeeCodeExisted();
    });

    test('Save but not fill any information', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await employeePage.clickUser();
        await employeePage.clickAddButton();
        await employeePage.clickSaveButton();
        await employeePage.validateRequiredFields();

    });

    test('Edit employee name', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await employeePage.clickUser();
        await employeePage.clickRow0();
        await employeePage.clickEditButton();
        await employeePage.fillEmployeeName('Automation test edit');
        await employeePage.clickSaveButton();
        // await toastPage.getToastUpdateSuccess();
        await toastPage.getToastEditSuccess();

    });

    test('Edit employee code', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const userEditCode = `userEditCode${randomSuffix}`;
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await employeePage.clickUser();
        await employeePage.clickRow0();
        await employeePage.clickEditButton();
        await employeePage.fillEmployeeCode(userEditCode);
        await employeePage.clickSaveButton();
        await toastPage.getToastEditSuccess();

    });

    test('Delete user', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await employeePage.clickUser();
        await employeePage.clickRow0();
        await employeePage.clickDeleteUser();
        await employeePage.clickYesButton();
        await toastPage.getToastDeleteSuccess();

        await employeePage.clickRow0();
        await employeePage.clickDeleteUser();
        await employeePage.clickYesButton();
        await toastPage.getToastDeleteSuccess();

        await employeePage.clickRow0();
        await employeePage.clickDeleteUser();
        await employeePage.clickYesButton();
        await toastPage.getToastDeleteSuccess();

    });

    test('Search user', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await employeePage.clickUser();

        // Search by code
        await employeePage.fillSearchByCode('BAT810');
        await employeePage.clickSearchButton();
        await employeePage.verifySearchByCode();
        await employeePage.clickClearSearch();

        // Search by name
        await employeePage.fillSearchByName('Nguyễn Văn Minh');
        await employeePage.clickSearchButton();
        await employeePage.verifySearchByName();
        await employeePage.clickClearSearch();

        // Seach by code and name
        await employeePage.fillSearchByCode('BAT810');
        await employeePage.fillSearchByName('Nguyễn Văn Minh');
        await employeePage.clickSearchButton();
        await employeePage.verifySearchByCode();
        await employeePage.verifySearchByName();
        await employeePage.clickClearSearch();

    });
});
