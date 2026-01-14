import { test, expect } from '../base-test';
import { allure } from "allure-playwright";
import Config from '../../../utils/configUtils';
import { checkContractExists, clearEmploymentContract, importEmploymentContract } from '../../../db/helpers/DBHelper';
import { LoginPage } from '../../../pages/LoginPage';
import { BasePage } from '../../../pages/BasePage';
import { ContractPage } from '../../../pages/contract_page/ContractPage';
import { createContractWithProbation } from './contractHelper';
import { ToastMessages, ValidationMessages } from '../../../constants/MessagesCommon';
import { ContractType, ContractStatus } from '../../../enums/ContractEnums';

test.describe.serial('Contract Tests', () => {
    let contractPage: ContractPage;
    let loginPage: LoginPage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) => {
        allure.owner("Minh Nguyen");
        allure.feature("Contract Feature");
        allure.severity("Critical");

        loginPage = new LoginPage(page);
        contractPage = new ContractPage(page);
        basePage = new BasePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await contractPage.clickContract();
    });

    test('Max lenghth of note is 255 characters - Kiểm tra nhập ghi chú tối đa 255 ký tự', async ({ page }) => {
        await clearEmploymentContract();
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.fillSalary("10000000");
        await contractPage.selectEndDate();
        await contractPage.fillNote('A'.repeat(255));
        await contractPage.clickUncheckEditor();
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Max lenghth of note over 255 characters - Kiểm tra nhập ghi chú quá 255 ký tự', async ({ page }) => {
        await clearEmploymentContract();
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.fillSalary("10000000");
        await contractPage.selectEndDate();
        await contractPage.fillNote('A'.repeat(256));
        await contractPage.clickUncheckEditor();
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await contractPage.verifyRequiredField(ValidationMessages.MAX_LENGTH_255);
    });

    test('Create contract with no select term and blank note - Tạo hợp đồng không chọn điều khoản và ghi chú rỗng', async ({ page }) => {
        await clearEmploymentContract();
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.fillSalary("10000000");
        await contractPage.selectEndDate();
        await contractPage.clickSave();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Edit contract type - Probation to Permanent - Chỉnh sửa hợp đồng từ thử việc sang chính thức', async ({ page }) => {
        await createContractWithProbation(basePage, contractPage);
        await contractPage.clickRow0();
        await contractPage.clickEdit();
        await contractPage.clickContractTypeDropdown();
        await contractPage.clickFormalContract();
        await basePage.clickSave();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
        await contractPage.verifyPermanentType();

    });

    test('Edit base salary - Chỉnh sửa lương cơ bản', async ({ page }) => {
        await contractPage.clickRow0();
        await contractPage.clickEdit();
        await contractPage.fillSalary("20000000");
        await basePage.clickSave();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit note - Chỉnh sửa ghi chú ', async ({ page }) => {
        await basePage.clickRow0();
        await basePage.clickEdit();
        await contractPage.fillNote('Automation test edit');
        await basePage.clickSave();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('E2E - Create contract with probation and confirm contract - Tạo hợp đồng thử việc và xác nhận hợp đồng', async ({ page }) => {
        await clearEmploymentContract();
        await createContractWithProbation(basePage, contractPage);
        await contractPage.clickRow0();
        await contractPage.clickConfirm();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_CONFIRM_SUCCESS);

        // Check in DB, type 0 is probation, status 1 is confirmed
        const existsInDB = await checkContractExists(
            'Automation test contract',
            ContractType.PROBATION,
            ContractStatus.CONFIRMED);
        expect(existsInDB).toBeTruthy();
    });

    test('Create with formal contract - Tạo hợp đồng chính thức', async ({ page }) => {
        await clearEmploymentContract();
        await contractPage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.clickContractTypeDropdown();
        await contractPage.clickFormalContract();
        await contractPage.fillNote('Automation test formal');
        await contractPage.clickUncheckEditor();
        // await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);

        const exitsInDB = await checkContractExists('Automation test formal', ContractType.PERMANENT, ContractStatus.NEW);
        expect(exitsInDB).toBeTruthy();

        await contractPage.clickRow0();
        await contractPage.clickConfirm();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_CONFIRM_SUCCESS);

        // Check in DB, type 1 is probation, status 1 is confirmed
        const existsInDB = await checkContractExists('Automation test formal', ContractType.PERMANENT, ContractStatus.CONFIRMED);
        expect(existsInDB).toBeTruthy();
    });

    test('E2E - Create a contract when there is an approved contract - Tạo hợp đồng khi đã có hợp đồng được duyệt', async ({ page }) => {
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.clickContractTypeDropdown();
        await contractPage.clickSeasonalContract();
        await contractPage.selectEndDate();
        await contractPage.fillNote('Automation test');
        await contractPage.clickUncheckEditor();
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_ADD_FAILED);
        await contractPage.verifyValidationMessage(ValidationMessages.CONTRACT_ALREADY_APPROVED);
    });

    test('E2E - Create with seasonal contract and confirm contract - Tạo hợp đồng thời vụ và xác nhận hợp đồng', async ({ page }) => {
        await clearEmploymentContract();
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.clickContractTypeDropdown();
        await contractPage.clickSeasonalContract();
        await contractPage.selectEndDate();
        await contractPage.fillNote('Automation test seasonal');
        await contractPage.clickUncheckEditor();
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);

        const exitsInDB = await checkContractExists('Automation test seasonal', ContractType.TEMPORARY, ContractStatus.NEW);
        expect(exitsInDB).toBeTruthy();

        await contractPage.clickRow0();
        await contractPage.clickConfirm();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_CONFIRM_SUCCESS);

        // Check in DB, type 0 is probation, status 1 is confirmed
        const existsInDB = await checkContractExists('Automation test seasonal', ContractType.TEMPORARY, ContractStatus.CONFIRMED);
        expect(existsInDB).toBeTruthy();
    });

    test('E2E - Terminate contract - Chấm dứt hợp đồng', async ({ page }) => {
        await clearEmploymentContract();
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.clickContractTypeDropdown();
        await contractPage.clickSeasonalContract();
        await contractPage.selectEndDate();
        await contractPage.fillNote('Automation test seasonal');
        await contractPage.clickUncheckEditor();
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);

        const exitsInDB = await checkContractExists('Automation test seasonal', ContractType.TEMPORARY, ContractStatus.NEW);
        expect(exitsInDB).toBeTruthy();

        await contractPage.clickRow0();
        await contractPage.clickConfirm();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_CONFIRM_SUCCESS);

        // Check in DB, type 0 is probation, status 1 is confirmed
        const isConfirmed = await checkContractExists('Automation test seasonal', ContractType.TEMPORARY, ContractStatus.CONFIRMED);
        expect(isConfirmed).toBeTruthy();

        await contractPage.handleTerminateContract();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_TERMINATE_CONTRACT_SUCCESS);
        await contractPage.verifyTerminatedStatusSearchResult();

        const isTerminated = await checkContractExists('Automation test seasonal', ContractType.TEMPORARY, ContractStatus.TERMINATED);
        expect(isTerminated).toBeTruthy();
    });

    test('E2E - Extension contract - Gia hạn hợp đồng', async ({ page }) => {
        await clearEmploymentContract();
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.clickContractTypeDropdown();
        await contractPage.clickSeasonalContract();
        await contractPage.selectEndDate();
        await contractPage.fillNote('Automation test seasonal');
        await contractPage.clickUncheckEditor();
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);

        const exitsInDB = await checkContractExists('Automation test seasonal', ContractType.TEMPORARY, ContractStatus.NEW);
        expect(exitsInDB).toBeTruthy();

        await contractPage.clickRow0();
        await contractPage.clickConfirm();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_CONFIRM_SUCCESS);

        // Check in DB, type 0 is probation, status 1 is confirmed
        const existsInDB = await checkContractExists('Automation test seasonal', ContractType.TEMPORARY, ContractStatus.CONFIRMED);
        expect(existsInDB).toBeTruthy();

        await contractPage.handleExtensionContract();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_EXTENSION_CONTRACT_SUCCESS);

    });

    test('Edit end date - Chỉnh sửa ngày kết thúc', async ({ page }) => {
        await clearEmploymentContract();
        await createContractWithProbation(basePage, contractPage);
        await basePage.clickRow0();
        await basePage.clickEdit();
        await contractPage.selectEndDate2();
        await basePage.clickSave();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Create with collaborator contract - Tạo hợp đồng cộng tác viên', async ({ page }) => {
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.clickContractTypeDropdown();
        await contractPage.clickCollaboratorContract();
        await contractPage.selectEndDate();
        await contractPage.fillNote('Automation test collaborator');
        await contractPage.clickUncheckEditor();
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);

        const exitsInDB = await checkContractExists('Automation test collaborator', ContractType.FREELANCER, ContractStatus.NEW);
        expect(exitsInDB).toBeTruthy();
    });

    test('Search by contract type - Tìm kiếm theo loại hợp đồng', async ({ page }) => {
        // import data
        await importEmploymentContract();

        // Search by probation type
        await contractPage.clickSearchByContractType();
        await contractPage.clickProbationType();
        await basePage.clickSearch();
        await contractPage.verifyProbationType();
        await basePage.clickClearSearch();

        // Search by permanent type
        await contractPage.clickSearchByContractType();
        await contractPage.clickPermanentType();
        await basePage.clickSearch();
        await contractPage.verifyPermanentType();
        await basePage.clickClearSearch();

        // Search by temporary type
        await contractPage.clickSearchByContractType();
        await contractPage.clickTemporaryType();
        await basePage.clickSearch();
        await contractPage.verifyTemporaryType();
        await basePage.clickClearSearch();

        // Search by freelace type
        await contractPage.clickSearchByContractType();
        await contractPage.clickFreelanceType();
        await basePage.clickSearch();
        await contractPage.verifyFreelanceType();
    });


    test('Search by status - Tìm kiếm theo trạng thái', async ({ page }) => {

        // Search by new status
        await contractPage.clickDropdownStatusSearch();
        await contractPage.clickNewStatusSearch();
        await basePage.clickSearch();
        await contractPage.verifyNewStatusSearchResult();
        await basePage.clickClearSearch();

        // Search by confirmed status
        await contractPage.clickDropdownStatusSearch();
        await contractPage.clickConfirmedStatusSearch();
        await basePage.clickSearch();
        await contractPage.verifyConfirmedStatusSearchResult();
        await basePage.clickClearSearch();

        // Search by terminated status
        await contractPage.clickDropdownStatusSearch();
        await contractPage.clickTerminatedStatusSearch();
        await basePage.clickSearch();
        await contractPage.verifyTerminatedStatusSearchResult();
        await basePage.clickClearSearch();

        // Search by canceled status
        await contractPage.clickDropdownStatusSearch();
        await contractPage.clickCanceledStatusSearch();
        await basePage.clickSearch();
        await contractPage.verifyCanceledStatusSearchResult();
    })

    test('Search by start date - Tìm kiếm theo ngày bắt đầu', async ({ page }) => {
        await contractPage.clickStartDateSearch();
        await basePage.clickTodayDatePicker();
        await basePage.clickSearch();
        await contractPage.verifyStartDateSearchResult();
        await basePage.clickClearSearch();

    });

    test('Search by code - Tìm kiếm theo mã hợp đồng', async ({ page }) => {
        await contractPage.fillSearchByCode('HD0001');
        await basePage.clickSearch();
        await contractPage.verifySearchByCodeResult();
        await basePage.clickClearSearch();

        // search by code not exist
        await contractPage.fillSearchByCode('Testttt258963');
        await basePage.clickSearch();
        await contractPage.verifyNoDataExistInSearch();
    });

    test('Search by name - Tìm kiếm theo tên nhân viên', async ({ page }) => {
        await contractPage.fillSearchByName('Nguyễn Văn Minh');
        await basePage.clickSearch();
        await contractPage.verifySearchByNameResult();

        // search by name not exist
        await contractPage.fillSearchByName('No da exist');
        await basePage.clickSearch();
        await contractPage.verifyNoDataExistInSearch();
    });

    test('Delete contract - Xóa hợp đồng', async ({ page }) => {
        await createContractWithProbation(basePage, contractPage);
        await contractPage.clickRow0();
        await contractPage.clickDelete();
        await contractPage.verifyToastMessage(ToastMessages.TOAST_DELETE_SUCCESS);
        await clearEmploymentContract();
    });
});
