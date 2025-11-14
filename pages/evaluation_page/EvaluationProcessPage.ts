import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class EvaluationProcessPage extends BasePage {
    readonly EVALUATION_PROCESS_BUTTON: Locator;
    readonly EMPLOYEE_EVALUATION_INPUT: Locator;
    readonly EMPLOYEE_EVALUATION_OPTION: Locator;
    readonly EVALUATION_TYPE_DROPDOWN: Locator;
    readonly EVALUATION_TYPE_OPTION_1: Locator;
    readonly EVALUATION_TYPE_OPTION_2: Locator;
    readonly START_TIME: Locator;
    readonly END_TIME: Locator;
    readonly EVALUATION_FORM: Locator;
    readonly DEPARTMENT_FORM: Locator;
    readonly CANCEL_BUTTON: Locator;
    readonly EVALUATION_BUTTON: Locator;
    readonly LIST_EVALUATION_BUTTON: Locator;
    readonly WAIT_EVALUATION_STATUS: Locator;
    readonly VALIDATE_DUPLICATE_EVALUATION: Locator;
    readonly SEARCH_BY_EMPLOYEE_NAME_INPUT: Locator;
    readonly SEARCH_BY_EVALUATION_TYPE_INPUT: Locator;
    readonly NEW_STATUS_OPTION: Locator;
    readonly PENDING_STATUS_OPTION: Locator;
    readonly CANCEL_STATUS_OPTION: Locator;
    readonly COMPLETE_STATUS_OPTION: Locator;
    readonly WAIT_FOR_APPROVAL_OPTION: Locator;
    readonly WAIT_FOR_EVALUATION_OPTION: Locator;
    readonly VERIFY_NEW_STATUS_OPTION: Locator;
    readonly VERIFY_CANCEL_STATUS_OPTION: Locator;
    readonly VERIFY_COMPLETE_STATUS_OPTION: Locator;
    readonly VERIFY_WAIT_FOR_APPROVAL_STATUS: Locator;
    readonly VERIFY_WAIT_FOR_EVALUATION_STATUS: Locator;
    readonly VERIFY_SEARCH_BY_NAME: Locator;
    readonly VERIFY_SEARCH_BY_EVALUATION_TYPE: Locator;
    readonly CLEAR_STATUS_BUTTON: Locator;
    readonly LIST_EVALUATION_VERIFY_NEW_STATUS: Locator;
    readonly LIST_EVALUATION_VERIFY_CANCEL_STATUS: Locator;
    readonly LIST_EVALUATION_VERIFY_COMPLETE_STATUS: Locator;
    readonly LIST_EVALUATION_VERIFY_WAIT_FOR_APPROVAL_STATUS: Locator;
    readonly LIST_EVALUATION_VERIFY_WAIT_FOR_EVALUATION_STATUS: Locator;
    readonly LIST_EVALUATION_SEARCH_BY_NAME: Locator;

    constructor(page: Page) {
        super(page);
        // List Evaluation
        this.LIST_EVALUATION_SEARCH_BY_NAME = page.getByRole('textbox', { name: 'Mã / tên nhân viên' });
        this.LIST_EVALUATION_VERIFY_NEW_STATUS = page.locator("//div[.=' Mới tạo']").first();
        this.LIST_EVALUATION_VERIFY_CANCEL_STATUS = page.locator("//div[.=' Đã hủy']").first();
        this.LIST_EVALUATION_VERIFY_COMPLETE_STATUS = page.locator("//div[.=' Hoàn thành']").first();
        this.LIST_EVALUATION_VERIFY_WAIT_FOR_APPROVAL_STATUS = page.locator("//div[.=' Chờ duyệt']").first();
        this.LIST_EVALUATION_VERIFY_WAIT_FOR_EVALUATION_STATUS = page.locator("//div[.=' Chờ đánh giá']").first();
        this.LIST_EVALUATION_VERIFY_NEW_STATUS = page.getByText('Mới tạo').first();
        this.CLEAR_STATUS_BUTTON = page.getByRole('button', { name: 'Clear' });
        this.VERIFY_SEARCH_BY_EVALUATION_TYPE = page.locator('#row-0').getByText('Đánh giá chuyên cần');
        this.VERIFY_SEARCH_BY_NAME = page.locator('span').filter({ hasText: 'Test đánh giá - NV Test đánh giá' }).first();
        this.VERIFY_NEW_STATUS_OPTION = page.locator('#row-0').getByText('Mới tạo');
        this.VERIFY_CANCEL_STATUS_OPTION = page.locator('#row-0').getByText('Đã hủy');
        this.VERIFY_COMPLETE_STATUS_OPTION = page.locator('#row-0').getByText('Hoàn thành');
        this.VERIFY_WAIT_FOR_APPROVAL_STATUS = page.locator('#row-0').getByText('Chờ duyệt');
        this.VERIFY_WAIT_FOR_EVALUATION_STATUS = page.locator('#row-0').getByText('Chờ đánh giá');
        this.WAIT_FOR_EVALUATION_OPTION = page.getByRole('option', { name: 'Chờ đánh giá' });
        this.WAIT_FOR_APPROVAL_OPTION = page.getByRole('option', { name: 'Chờ duyệt' });
        this.COMPLETE_STATUS_OPTION = page.getByRole('option', { name: 'Hoàn thành' });
        this.CANCEL_STATUS_OPTION = page.getByRole('option', { name: 'Đã hủy' });
        this.PENDING_STATUS_OPTION = page.getByRole('option', { name: 'Chờ duyệt' });
        this.NEW_STATUS_OPTION = page.getByRole('option', { name: 'Mới tạo' });
        this.SEARCH_BY_EVALUATION_TYPE_INPUT = page.getByRole('textbox', { name: 'Loại đánh giá' });
        this.SEARCH_BY_EMPLOYEE_NAME_INPUT = page.getByRole('textbox', { name: 'Nhân viên được đánh giá' });
        this.VALIDATE_DUPLICATE_EVALUATION = page.locator("//li[contains(text(),'Nhân viên này đang được đánh giá, vui lòng hoàn th')]");
        this.WAIT_EVALUATION_STATUS = page.locator("//div[normalize-space()='Chờ đánh giá']");
        this.LIST_EVALUATION_BUTTON = page.locator("//div[@class='v-list-item-title'][contains(text(),'Danh sách đánh giá')]");
        this.EVALUATION_BUTTON = page.getByRole('button', { name: 'Đánh giá' }).first();
        this.CANCEL_BUTTON = page.locator("//span[contains(normalize-space(),'Hủy')]");
        this.DEPARTMENT_FORM = page.locator("//div[@role='option']//div[@class='v-list-item-title'][contains(text(),'Bộ phận')]");
        this.EVALUATION_FORM = page.getByRole('combobox').filter({ hasText: 'Hình thức đánh giá ※' }).locator('i');
        this.END_TIME = page.getByRole('textbox', { name: 'Thời gian kết thúc ※' });
        this.START_TIME = page.getByRole('textbox', { name: 'Thời gian bắt đầu ※' });
        this.EVALUATION_TYPE_OPTION_1 = page.locator("//div[text()='Đánh giá chuyên cần']");
        this.EVALUATION_TYPE_OPTION_2 = page.locator("//div[text()='Đánh giá đạo đức']");
        this.EVALUATION_TYPE_DROPDOWN = page.getByRole('textbox', { name: 'Loại đánh giá ※' });
        this.EMPLOYEE_EVALUATION_OPTION = page.locator("//div[@role='option']//div[@class='v-list-item-title']");
        this.EMPLOYEE_EVALUATION_INPUT = page.getByRole('textbox', { name: 'Nhân viên được đánh giá ※' });
        this.EVALUATION_PROCESS_BUTTON = page.locator("//div[contains(text(),'Quy trình đánh giá')]");
    }

    async fillListEvaluationSearchByName(text: string) {
        await this.safeFill(this.LIST_EVALUATION_SEARCH_BY_NAME, text);
    }

    async expectListEvaluationVerifyNewStatus() {
        await this.safeVerifyToHaveText(this.LIST_EVALUATION_VERIFY_NEW_STATUS, "Mới tạo");
    }

    async expectListEvaluationVerifyCancelStatus() {
        await this.safeVerifyToHaveText(this.LIST_EVALUATION_VERIFY_CANCEL_STATUS, "Đã hủy");
    }

    async expectListEvaluationVerifyCompleteStatus() {
        await this.safeVerifyToHaveText(this.LIST_EVALUATION_VERIFY_COMPLETE_STATUS, "Hoàn thành");
    }

    async expectListEvaluationVerifyWaitForApprovalStatus() {
        await this.safeVerifyToHaveText(this.LIST_EVALUATION_VERIFY_WAIT_FOR_APPROVAL_STATUS, "Chờ duyệt");
    }

    async expectListEvaluationVerifyWaitForEvaluationStatus() {
        await this.safeVerifyToHaveText(this.LIST_EVALUATION_VERIFY_WAIT_FOR_EVALUATION_STATUS, "Chờ đánh giá");
    }

    async clearStatus() {
        await this.safeClick(this.CLEAR_STATUS_BUTTON);
    }

    async expectSearchByEvaluationType() {
        await this.safeVerifyToHaveText(this.VERIFY_SEARCH_BY_EVALUATION_TYPE, "Đánh giá chuyên cần");
    }

    async expectSearchByEmployeeName() {
        await this.safeVerifyTextContains(this.VERIFY_SEARCH_BY_NAME, "Test đánh giá - NV Test đánh giá");
    }

    async fillSearchByEmployeeNameInput(text: string) {
        await this.safeFill(this.SEARCH_BY_EMPLOYEE_NAME_INPUT, text);
    }

    async fillSearchByEvaluationTypeInput(text: string) {
        await this.safeFill(this.SEARCH_BY_EVALUATION_TYPE_INPUT, text);
    }

    async expectNewStatusOption() {
        await this.safeVerifyToHaveText(this.VERIFY_NEW_STATUS_OPTION, "Mới tạo");
    }

    async expectCancelStatusOption() {
        await this.safeVerifyToHaveText(this.VERIFY_CANCEL_STATUS_OPTION, "Đã hủy");
    }

    async expectCompleteStatusOption() {
        await this.safeVerifyToHaveText(this.VERIFY_COMPLETE_STATUS_OPTION, "Hoàn thành");
    }

    async expectWaitForApprovalStatus() {
        await this.safeVerifyToHaveText(this.VERIFY_WAIT_FOR_APPROVAL_STATUS, "Chờ duyệt");
    }

    async expectWaitForEvaluationStatus() {
        await this.safeVerifyToHaveText(this.VERIFY_WAIT_FOR_EVALUATION_STATUS, "Chờ đánh giá");
    }

    async clickNewStatusOption() {
        await this.safeClick(this.NEW_STATUS_OPTION);
    }

    async clickCancelStatusOption() {
        await this.safeClick(this.CANCEL_STATUS_OPTION);
    }

    async clickCompleteStatusOption() {
        await this.safeClick(this.COMPLETE_STATUS_OPTION);
    }

    async clickWaitForApprovalOption() {
        await this.safeClick(this.WAIT_FOR_APPROVAL_OPTION);
    }

    async clickWaitForEvaluationOption() {
        await this.safeClick(this.WAIT_FOR_EVALUATION_OPTION);
    }

    async getValidateDuplicateEvaluation() {
        await this.safeVerifyToHaveText(this.VALIDATE_DUPLICATE_EVALUATION, "Nhân viên này đang được đánh giá, vui lòng hoàn thành trước khi tạo mới hoặc cập nhật");
    }

    async getWaitEvaluationStatus() {
        await this.safeVerifyToHaveText(this.WAIT_EVALUATION_STATUS, "Chờ đánh giá");
    }

    async clickListEvaluationButton() {
        await this.safeClick(this.LIST_EVALUATION_BUTTON);
    }

    async clickEvaluationButton() {
        await this.safeClick(this.EVALUATION_BUTTON);
    }

    async clickEvaluationTypeOption2() {
        await this.safeClick(this.EVALUATION_TYPE_OPTION_2);
    }

    async clickEvaluationTypeOption1() {
        await this.safeClick(this.EVALUATION_TYPE_OPTION_1);
    }

    async clickEndTime() {
        await this.safeClick(this.END_TIME);
    }

    async clickStartTime() {
        await this.safeClick(this.START_TIME);
    }

    async clickEvaluationForm() {
        await this.safeClick(this.EVALUATION_FORM);
    }

    async clickDepartmentForm() {
        await this.safeClick(this.DEPARTMENT_FORM);
    }

    async clickEmployeeEvaluationOption() {
        await this.safeClick(this.EMPLOYEE_EVALUATION_OPTION);
    }

    async clickEvaluationTypeDropDown() {
        await this.safeClick(this.EVALUATION_TYPE_DROPDOWN);
    }

    async fillEmployeeEvaluationInput(text: string) {
        await this.safeFill(this.EMPLOYEE_EVALUATION_INPUT, text);
    }

    async clickEvaluationProcessButton() {
        await this.safeClick(this.EVALUATION_PROCESS_BUTTON);
    }
}