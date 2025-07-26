import { test, } from './base-test';
import { LoginPage } from '../pages/LoginPage';
import Config from '../utils/configUtils';
import { allure } from 'allure-playwright';
import { EmployeePage } from '../pages/EmployeePage';
import { ResumePage } from '../pages/ResumePage';
import { ToastPage } from '../pages/ToastPage';
import { clearAllowanceTypes, clearEmployees } from '../db/helpers/DBHelper';

test.describe.serial('Employee Tests', () => {
    let loginPage: LoginPage;
    let employeePage: EmployeePage
    let resumePage: ResumePage;
    let toastPage: ToastPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Employee Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        toastPage = new ToastPage(page);
        employeePage = new EmployeePage(page);
        loginPage = new LoginPage(page);
        resumePage = new ResumePage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await employeePage.clickAdmin();
        await employeePage.clickUser();
    });

    test("Max length of all fields", async ({ page }) => {
        allure.severity('Critical');
        await clearAllowanceTypes();
        await clearEmployees();
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const emailRandom = `email${randomSuffix}`;
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await employeePage.clickAdd();

        // Fill information
        await employeePage.fillEmployeeCode("z".repeat(20));
        await employeePage.fillEmployeeName('z'.repeat(255));
        await employeePage.fillEmail(emailRandom);
        await employeePage.clickSelectMale();
        await employeePage.clickDropdownBranch();
        await employeePage.clickSelectBranch();
        await employeePage.clickDropdownDepartment();
        await employeePage.clickSelectDepartment();
        await employeePage.clickDropdownEmployeeType();
        await employeePage.clickStaff();

        // Fill more information
        await employeePage.clickDropdownPosition();
        await employeePage.clickPosition();
        await employeePage.clickDropdownRank();
        await employeePage.clickSelectRank();
        await employeePage.fillCitizenIdMaxlength("9".repeat(20));
        await employeePage.clickCitizenIdCardIssueDate();
        await employeePage.clicktodayDatePicker();
        await employeePage.fillPlaceOfIssueOfIdentityCard("z".repeat(255));
        await employeePage.fillBankName('Vietcombank');
        await employeePage.fillBankAccountNumber("9".repeat(20));
        await employeePage.fillPhoneNumber(phoneNumber);
        await employeePage.clickDateOfBirth();
        await employeePage.clickChosseYear();
        await employeePage.clickSelectYear();
        await employeePage.clickChosseMonth();
        await employeePage.clickSelectMonth();
        await employeePage.clickSelectDay();
        await employeePage.clickDateOfJoiningTheCompany();
        await employeePage.clicktodayDatePicker();
        await employeePage.fillAddress("z".repeat(255));
        await employeePage.fillNote("z".repeat(500));
        await employeePage.clickSave();
        await toastPage.getToastAddSuccess();
    });


    test('Test max length of resume', async ({ page }) => {
        allure.severity('Critical');
        const random10Digits = Math.floor(1000000000 + Math.random() * 9000000000);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await employeePage.fillSearchByName("Test max length resume");
        await employeePage.clickSearch();
        await employeePage.clickRow0();
        await resumePage.clickResume();
        await resumePage.clickEditNth1();
        await resumePage.fillAliasName("z".repeat(255));
        await resumePage.fillPlaceOfBirth("z".repeat(255));
        await resumePage.fillHomeTown("z".repeat(255));
        await resumePage.fillPermanentResidence("z".repeat(255));
        await resumePage.fillHomePhoneNumber(phoneNumber);
        await resumePage.fillOfficePhoneNumber(phoneNumber);
        await resumePage.fillNationPeople("z".repeat(100));
        await resumePage.fillReligion("z".repeat(100));
        await resumePage.fillNationality("z".repeat(100));
        await resumePage.fillMaritalStatus("z".repeat(100));
        await resumePage.fillEducationalLevel("z".repeat(100));
        await resumePage.fillProfessionalQualifications("z".repeat(100));
        await resumePage.fillMajor("z".repeat(255));
        await resumePage.fillPoliticalTheory("z".repeat(100));
        await resumePage.fillStateManagement("z".repeat(100));
        await resumePage.fillPassportNumber(random10Digits.toString());
        await resumePage.fillWherePassportsAreIssued("z".repeat(100));
        await resumePage.fillSocialSecurityNumber(random10Digits.toString());
        await resumePage.fillInsuranceNumber(random10Digits.toString());
        await resumePage.fillHeight("170");
        await resumePage.fillWeight("60");
        await resumePage.fillHealthStatus("K".repeat(100));
        await resumePage.fillBloodType("A".repeat(10));
        await resumePage.fillCurrentJob("z".repeat(255));
        await resumePage.fillPreRecruitment("C".repeat(255));
        await resumePage.fillOrganizationJoined("z".repeat(255));
        await resumePage.fillRecruimentForm("T".repeat(100));
        await resumePage.fillRecruitedPosition("C".repeat(255));
        await employeePage.clickSave();
        await toastPage.getToastEditSuccess();
    });

    test(`E2E - Add with role employee`, async ({ page }) => {
        allure.severity('Critical');
        await employeePage.addWithRoleEmployee();
    });

    test('Test resume with full data valid information', async ({ page }) => {
        allure.severity('Critical');
        await employeePage.clickRow0();
        await resumePage.testResumeWithValidData();
        await employeePage.clickSave();
        await toastPage.getToastEditSuccess();
    });

    test('Add with basic information and set salary by date ', async ({ page }) => {
        await employeePage.testAddAndSetSalaryByDate();
    });

    test('Add without set salary', async ({ page }) => {
        await employeePage.addWithoutSetSalary();
    });

    test('Add with basic information and edit information', async ({ page }) => {
        await employeePage.testAddEmployee();
        await employeePage.clickSave();
        await toastPage.getToastAddSuccess();
        await employeePage.clickRow0();
        await employeePage.clickEdit();
        await employeePage.testFillMoreInformation();
        await employeePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Save resume with empty information required', async ({ page }) => {
        await employeePage.clickRow0();
        await resumePage.testSaveWithEmptyFieldsRequired();
        await employeePage.clickSave();
        await resumePage.verifyMsgEthnicityRequired();
        await resumePage.verifyMsgPlaceOfBirthRequired();
        await resumePage.verifyMsgReligionRequired();
        await resumePage.verifyMsgHownTownRequired();
    });

    test('Add with invalid email', async ({ page }) => {
        await employeePage.addWithWrongFormatEmail();
    });

    test('Min length of email', async ({ page }) => {
        await employeePage.testMinlengthEmail();
    });

    test.skip('Add with role department management', async ({ page }) => {
        await employeePage.addWithRoleDepartmentManager();
    });

    test('Add with duplicate employee code and email', async ({ page }) => {
        await employeePage.addWithDuplicateCodeAndEmail();
    });

    test('Edit employee name', async ({ page }) => {
        await employeePage.testEditEmployeeName();
    });

    test('Edit employee code', async ({ page }) => {
        await employeePage.testEditEmployeeCode();
    });

    test('Delete user', async ({ page }) => {
        await employeePage.fillSearchByName("Automation");
        await employeePage.clickSearch();
        await employeePage.deleteAUser();
    });

    test('Search by employee code and name', async ({ page }) => {
        await employeePage.searchByEmployeeCode();
        await employeePage.searchByEmployeeName();
        await employeePage.searchByEmployeeCodeAndName();
    });

    test('Search by gender', async ({ page }) => {
        await employeePage.searchByGender();
    });

    test('Search by department', async ({ page }) => {
        await employeePage.searchByDepartment();
    });

    test('Save without any information', async ({ page }) => {
        await employeePage.testSaveWithoutAnyInformation();
    });
});
