import { test, } from './base-test';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { allure } from 'allure-playwright';
import { BranchPage } from '../../pages/BranchPage';
import { clearBranch } from '../../db/helpers/DBHelper';
import { ToastMessages, ValidationMessages } from '../../constants/MessagesCommon';

test.describe.serial('Branch Test', () => {
    let loginPage: LoginPage;
    let branchPage: BranchPage

    test.beforeEach(async ({ page }) => {
        allure.feature('Branch Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        branchPage = new BranchPage(page);
        loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password)
        await branchPage.clickAdmin();
    })

    test('Create branch with valid information - Tạo chi nhánh với thông tin hợp lệ', async ({ page }) => {
        await clearBranch();
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;

        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNote(randomString);
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Create with over number of employee - Tạo chi nhánh với số lượng nhân viên lớn hơn 1000', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("1001");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.clickSave();
        await branchPage.verifyMaxNumberOfEmployee();
    });

    test('Create with min number of employee - Tạo chi nhánh với số lượng nhân viên nhỏ hơn 100', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("99");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.clickSave();
        await branchPage.verifyMinNumberOfEmployee();
    });

    test('Create with duplicate branch name - Tạo chi nhánh với tên trùng', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName('Biên Hòa');
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_ADD_FAILED);
        await branchPage.verifyBranchExist();
    });

    test('Create with duplicate short name - Tạo chi nhánh với tên ngắn trùng', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName('BH101');
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_ADD_FAILED);
    });

    test('Create with lock status - Tạo chi nhánh với trạng thái khóa', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.clickDropdownStatusInFormNth1();
        await branchPage.clickLockStatus();
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
        await branchPage.verifyLockStatusRow0();
    });

    test('Create with blank address and note - Tạo chi nhánh với địa chỉ và ghi chú rỗng', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.clickSave();
    });

    test('Create with blank data - Tạo chi nhánh với dữ liệu rỗng', async ({ page }) => {
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.clickSave();
        await branchPage.verifyPhoneNumber();
        await branchPage.verifyBranchNameRequired();
        await branchPage.verifyShortNameRequired();
    });

    test('Edit active status to lock status - Chỉnh sửa trạng thái chi nhánh từ hoạt động sang khóa', async ({ page }) => {
        await branchPage.clickBranchButton();
        await branchPage.clickEditRow0();
        await branchPage.clickDropdownStatusInFormNth1();
        await branchPage.clickLockStatus();
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
        await branchPage.verifyLockStatusRow0();
    });

    test('Edit lock status to active status - Chỉnh sửa trạng thái chi nhánh từ khóa sang hoạt động', async ({ page }) => {
        await branchPage.clickBranchButton();
        await branchPage.clickEditRow0();
        await branchPage.clickDropdownStatusInFormNth1();
        await branchPage.clickActivityStatus();
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
        await branchPage.verifyActivityStatusRow0();
    });

    test('Edit branch name - Chỉnh sửa tên chi nhánh', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        await branchPage.clickBranchButton();
        await branchPage.clickEditRow0();
        await branchPage.fillBranchName(randomString);
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit short name - Chỉnh sửa tên ngắn', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        await branchPage.clickBranchButton();
        await branchPage.clickEditRow0();
        await branchPage.fillShortName(randomString);
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit number of employee - Chỉnh sửa số lượng nhân viên', async ({ page }) => {
        await branchPage.clickBranchButton();
        await branchPage.clickEditRow0();
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit phone number - Chỉnh sửa số điện thoại', async ({ page }) => {
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickEditRow0();
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit branch address - Chỉnh sửa địa chỉ chi nhánh', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        await branchPage.clickBranchButton();
        await branchPage.clickEditRow0();
        await branchPage.fillBranchAddress(randomString);
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit note - Chỉnh sửa ghi chú', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        await branchPage.clickBranchButton();
        await branchPage.clickEditRow0();
        await branchPage.fillNote(randomString);
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit with duplicate branch name - Chỉnh sửa chi nhánh với tên trùng', async ({ page }) => {
        await branchPage.clickBranchButton();
        await branchPage.clickEditRow0();
        await branchPage.fillBranchName('Biên Hòa');
        await branchPage.fillBranchAddress('Automation test branch ');
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_FAILED);
        await branchPage.verifyBranchExist();
    })

    test('Edit all fields - Chỉnh sửa tất cả thông tin chi nhánh', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickEditRow0();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNote(randomString);
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Delete branch - Xóa chi nhánh', async ({ page }) => {
        await branchPage.clickBranchButton();
        await branchPage.clickDeleteRow0();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_DELETE_SUCCESS);
    });

    test('Search by branch name - Tìm kiếm chi nhánh theo tên', async ({ page }) => {
        await branchPage.clickBranchButton();
        await branchPage.fillSearchByBranchName("Biên Hòa");
        await branchPage.clickSearch();
        await branchPage.verifySearchByNameResult();
    });

    test('Search by status - Tìm kiếm chi nhánh theo trạng thái', async ({ page }) => {
        await branchPage.clickBranchButton();
        await branchPage.clickDropdownStatusSearch();
        await branchPage.clickLockStatus();
        await branchPage.clickSearch();
        await branchPage.verifyLockStatusRow0();
        await branchPage.clickClearSearch();

        await branchPage.clickDropdownStatusSearch();
        await branchPage.clickActivityStatus();
        await branchPage.clickSearch();
        await branchPage.verifyActivityStatusRow0();
    });

    test("Max length of branch name 255 characters ", async ({ page }) => {
        await clearBranch();
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName("z".repeat(255));
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNote(randomString);
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test("Max length of branch name over 255 characters", async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName("z".repeat(256));
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNote(randomString);
        await branchPage.clickSave();
        await branchPage.verifyRequiredField(ValidationMessages.MAX_LENGTH_255);
    });

    test("Max length of short name 50 characters", async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName("z".repeat(50));
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNote(randomString);
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test("Max length of short name over 50 characters", async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName("z".repeat(51));
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNote(randomString);
        await branchPage.clickSave();
        await branchPage.verifyRequiredField(ValidationMessages.MAX_LENGTH_50);
    });

    test("Max length of note 500 characters", async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNote("z".repeat(500));
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test("Max length of branch address 500 characters", async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress("z".repeat(500));
        await branchPage.fillNote(randomString);
        await branchPage.clickSave();
        await branchPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test("Max length of note over 500 characters", async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNote("z".repeat(501));
        await branchPage.clickSave();
        await branchPage.verifyRequiredField(ValidationMessages.MAX_LENGTH_500);
    });

    test("Max length of branch address over 500 characters", async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await branchPage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress("z".repeat(501));
        await branchPage.fillNote(randomString);
        await branchPage.clickSave();
        await branchPage.verifyRequiredField(ValidationMessages.MAX_LENGTH_500);
    });
});
