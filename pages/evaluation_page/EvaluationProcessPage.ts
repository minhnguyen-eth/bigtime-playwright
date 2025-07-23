import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";
export class EvaluationProcessPage extends BasePage {
    readonly evaluationProcessButton: Locator;
    readonly employyeEvaluationInput: Locator;
    readonly employeeEvaluationOption: Locator;
    readonly evaluationTypeDropDown: Locator;
    readonly evaluationTypeOption1: Locator;
    readonly evaluationTypeOption2: Locator;
    readonly startTime: Locator;
    readonly endTime: Locator;
    readonly evaluationForm: Locator;
    readonly departmentForm: Locator;
    readonly cancelButton: Locator;
    readonly evaluationButton: Locator;
    readonly listEvaluationButton: Locator;
    readonly waitEvaluationStatus: Locator;
    readonly validateDuplicateEvaluation: Locator;
    readonly searchByEmployeeNameInput: Locator;
    readonly searchByEvaluationTypeInput: Locator;
    readonly newStatusOption: Locator;
    readonly pendingStatusOption: Locator;
    readonly cancelStatusOption: Locator;
    readonly completeStatusOption: Locator;
    readonly waitForApprovalOption: Locator;
    readonly waitForEvaluationOption: Locator;
    readonly verifyNewStatusOption: Locator;
    readonly verifyCancelStatusOption: Locator;
    readonly verifyCompleteStatusOption: Locator;
    readonly verifywaitForApprovalStatus: Locator;
    readonly verifywaitForEvaluationStatus: Locator;
    readonly verifySearchByName: Locator;
    readonly verifySearchByEvaluationType: Locator;
    readonly clearStatusButton: Locator;
    readonly listEvaluationVerifyNewStatus: Locator;
    readonly listEvaluationVerifyCancelStatus: Locator;
    readonly listEvaluationVerifyCompleteStatus: Locator;
    readonly listEvaluationVerifywaitForApprovalStatus: Locator;
    readonly listEvaluationVerifywaitForEvaluationStatus: Locator;
    readonly listEvaluationSearchByName: Locator;

    constructor(page: Page) {
        super(page);
        // List Evaluation
        this.listEvaluationSearchByName = page.getByRole('textbox', { name: 'Mã - tên nhân viên' })
        this.listEvaluationVerifyNewStatus = page.locator("//div[.=' Mới tạo']").first();
        this.listEvaluationVerifyCancelStatus = page.locator("//div[.=' Đã hủy']").first();
        this.listEvaluationVerifyCompleteStatus = page.locator("//div[.=' Hoàn thành']").first();
        this.listEvaluationVerifywaitForApprovalStatus = page.locator("//div[.=' Chờ duyệt']").first();
        this.listEvaluationVerifywaitForEvaluationStatus = page.locator("//div[.=' Chờ đánh giá']").first();
        this.listEvaluationVerifyNewStatus = page.getByText('Mới tạo').first()
        this.clearStatusButton = page.getByRole('button', { name: 'Clear' })
        this.verifySearchByEvaluationType = page.locator('#row-0').getByText('Đánh giá chuyên cần')
        this.verifySearchByName = page.locator('#row-0').getByText('BAT - Big App Tech')
        this.verifyNewStatusOption = page.locator('#row-0').getByText('Mới tạo')
        this.verifyCancelStatusOption = page.locator('#row-0').getByText('Đã hủy')
        this.verifyCompleteStatusOption = page.locator('#row-0').getByText('Hoàn thành')
        this.verifywaitForApprovalStatus = page.locator('#row-0').getByText('Chờ duyệt')
        this.verifywaitForEvaluationStatus = page.locator('#row-0').getByText('Chờ đánh giá')
        this.waitForEvaluationOption = page.getByRole('option', { name: 'Chờ đánh giá' })
        this.waitForApprovalOption = page.getByRole('option', { name: 'Chờ duyệt' })
        this.completeStatusOption = page.getByRole('option', { name: 'Hoàn thành' })
        this.cancelStatusOption = page.getByRole('option', { name: 'Đã hủy' })
        this.pendingStatusOption = page.getByRole('option', { name: 'Chờ duyệt' })
        this.newStatusOption = page.getByRole('option', { name: 'Mới tạo' })
        this.searchByEvaluationTypeInput = page.getByRole('textbox', { name: 'Loại đánh giá' })
        this.searchByEmployeeNameInput = page.getByRole('textbox', { name: 'Nhân viên được đánh giá' })
        this.validateDuplicateEvaluation = page.locator("//li[contains(text(),'Nhân viên này đang được đánh giá, vui lòng hoàn th')]");
        this.waitEvaluationStatus = page.locator("//div[normalize-space()='Chờ đánh giá']");
        this.listEvaluationButton = page.locator("//div[@class='v-list-item-title'][contains(text(),'Danh sách đánh giá')]");
        this.evaluationButton = page.getByRole('button', { name: 'Đánh giá' }).first();
        this.cancelButton = page.locator("//span[contains(normalize-space(),'Hủy')]");
        this.departmentForm = page.locator("//div[@role='option']//div[@class='v-list-item-title'][contains(text(),'Bộ phận')]");
        this.evaluationForm = page.getByRole('combobox').filter({ hasText: 'Hình thức đánh giá ※' }).locator('i');
        this.endTime = page.getByRole('textbox', { name: 'Thời gian kết thúc ※' })
        this.startTime = page.getByRole('textbox', { name: 'Thời gian bắt đầu ※' })
        this.evaluationTypeOption1 = page.locator("//div[text()='Đánh giá chuyên cần']");
        this.evaluationTypeOption2 = page.locator("//div[text()='Đánh giá đạo đức']");
        this.evaluationTypeDropDown = page.getByRole('textbox', { name: 'Loại đánh giá ※' });
        this.employeeEvaluationOption = page.locator("//div[@role='option']//div[@class='v-list-item-title']");
        this.employyeEvaluationInput = page.getByRole('textbox', { name: 'Nhân viên được đánh giá ※' })
        this.evaluationProcessButton = page.locator("//div[contains(text(),'Quy trình đánh giá')]");
    }
    async fillListEvaluationSearchByName(Text: string) {
        await this.safeFill(this.listEvaluationSearchByName, Text);
    }

    async expectListEvaluationVerifyNewStatus() {
        await this.safeVerifyToHaveText(this.listEvaluationVerifyNewStatus, "Mới tạo");
    }

    async expectListEvaluationVerifyCancelStatus() {
        await this.safeVerifyToHaveText(this.listEvaluationVerifyCancelStatus, "Đã hủy");
    }

    async expectListEvaluationVerifyCompleteStatus() {
        await this.safeVerifyToHaveText(this.listEvaluationVerifyCompleteStatus, "Hoàn thành");
    }

    async expectListEvaluationVerifywaitForApprovalStatus() {
        await this.safeVerifyToHaveText(this.listEvaluationVerifywaitForApprovalStatus, "Chờ duyệt");
    }

    async expectListEvaluationVerifywaitForEvaluationStatus() {
        await this.safeVerifyToHaveText(this.listEvaluationVerifywaitForEvaluationStatus, "Chờ đánh giá");
    }

    async clearStatus() {
        await this.safeClick(this.clearStatusButton);
    }

    async expectSearchByEvaluationType() {
        await this.safeVerifyToHaveText(this.verifySearchByEvaluationType, "Đánh giá chuyên cần");
    }

    async expectSearchByEmployeeName() {
        await this.safeVerifyTextContains(this.verifySearchByName, "BAT - Big");
    }

    async fillSearchByEmployeeNameInput(Text: string) {
        await this.safeFill(this.searchByEmployeeNameInput, Text);
    }

    async fillSearchByEvaluationTypeInput(Text: string) {
        await this.safeFill(this.searchByEvaluationTypeInput, Text);
    }

    async expectNewStatusOption() {
        await this.safeVerifyToHaveText(this.verifyNewStatusOption, "Mới tạo");
    }

    async expectCancelStatusOption() {
        await this.safeVerifyToHaveText(this.verifyCancelStatusOption, "Đã hủy");
    }

    async expectCompleteStatusOption() {
        await this.safeVerifyToHaveText(this.verifyCompleteStatusOption, "Hoàn thành");
    }

    async expectwaitForApprovalStatus() {
        await this.safeVerifyToHaveText(this.verifywaitForApprovalStatus, "Chờ duyệt");
    }

    async expectwaitForEvaluationStatus() {
        await this.safeVerifyToHaveText(this.verifywaitForEvaluationStatus, "Chờ đánh giá");
    }

    async clickNewStatusOption() {
        await this.safeClick(this.newStatusOption);
    }

    async clickCancelStatusOption() {
        await this.safeClick(this.cancelStatusOption);
    }

    async clickCompleteStatusOption() {
        await this.safeClick(this.completeStatusOption);
    }

    async clickwaitForApprovalOption() {
        await this.safeClick(this.waitForApprovalOption);
    }

    async clickwaitForEvaluationOption() {
        await this.safeClick(this.waitForEvaluationOption);
    }

    async getValidateDuplicateEvaluation() {
        await this.safeVerifyToHaveText(this.validateDuplicateEvaluation, "Nhân viên này đang được đánh giá, vui lòng hoàn thành trước khi tạo mới hoặc cập nhật");
    }

    async getWaitEvaluationStatus() {
        await this.safeVerifyToHaveText(this.waitEvaluationStatus, "Chờ đánh giá");
    }

    async clickListEvaluationButton() {
        await this.safeClick(this.listEvaluationButton);
    }

    async clickEvaluationButton() {
        await this.safeClick(this.evaluationButton);
    }

    async clickEvaluationTypeOption2() {
        await this.safeClick(this.evaluationTypeOption2);
    }

    async clickEvaluationTypeOption1() {
        await this.safeClick(this.evaluationTypeOption1);
    }

    async clickEndTime() {
        await this.safeClick(this.endTime);
    }

    async clickStartTime() {
        await this.safeClick(this.startTime);
    }

    async clickEvaluationForm() {
        await this.safeClick(this.evaluationForm);
    }

    async clickDepartmentForm() {
        await this.safeClick(this.departmentForm);
    }

    async clickEmployeeEvaluationOption() {
        await this.safeClick(this.employeeEvaluationOption);
    }

    async clickEvaluationTypeDropDown() {
        await this.safeClick(this.evaluationTypeDropDown);
    }

    async fillEmployeeEvaluationInput(Text: string) {
        await this.safeFill(this.employyeEvaluationInput, Text);
    }

    async clickEvaluationProcessButton() {
        await this.safeClick(this.evaluationProcessButton);
    }
}
