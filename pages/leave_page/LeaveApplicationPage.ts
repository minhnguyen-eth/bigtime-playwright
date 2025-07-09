import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class LeaveApplicationPage extends BasePage {
    readonly searchButton: Locator;
    readonly leaveApplicationButton: Locator;
    readonly addButton: Locator;
    readonly leaveTypeDropDown: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly reason: Locator;
    readonly todayButton: Locator;
    readonly chosseButton: Locator;
    readonly numberOfDaysOff: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    readonly sendButton: Locator;
    readonly OKButton: Locator;
    readonly Row0: Locator;
    readonly toastSendSuccess: Locator;
    readonly browsedButton: Locator;
    readonly toastBrowsedSuccess: Locator;
    readonly anualLeave: Locator;
    readonly regularLeave: Locator;
    readonly specialLeave: Locator;
    readonly socialInsuranceLeave: Locator;
    readonly maternityLeave: Locator;
    readonly logoutButton: Locator;
    readonly logoutConfirmButton: Locator;

    // verify type of leave
    readonly verifySpecialLeave: Locator;
    readonly verifyMaternityLeave: Locator;
    readonly verifySocialInsuranceLeave: Locator;
    readonly verifyRegularLeave: Locator;
    readonly verifyAnualLeave: Locator;

    constructor(page: Page) {
        super(page);
        this.verifySpecialLeave = page.locator("//div[normalize-space()='Nghỉ đặc biệt']")
        this.verifyMaternityLeave = page.locator("//div[normalize-space()='Nghỉ thai sản']")
        this.verifySocialInsuranceLeave = page.locator("//div[normalize-space()='Nghỉ bảo hiểm xã hội']")
        this.verifyRegularLeave = page.locator("//div[normalize-space()='Nghỉ thường']")
        this.verifyAnualLeave = page.locator("//div[normalize-space()='Nghỉ theo phép năm']")
        this.specialLeave = page.locator("//div[contains(text(),'Nghỉ đặc biệt')]")
        this.maternityLeave = page.locator("//div[contains(text(),'Nghỉ thai sản')]")
        this.socialInsuranceLeave = page.locator("//div[contains(text(),'Nghỉ bảo hiểm xã hội')]")
        this.regularLeave = page.locator("//div[contains(text(),'Nghỉ thường')]")
        this.browsedButton = page.locator("//span[contains(text(),'Duyệt')]")
        this.Row0 = page.locator("//tr[@id='row-0']")
        this.OKButton = page.locator("//span[normalize-space()='Có']")
        this.sendButton = page.locator("//span[contains(text(),'Gửi')]")
        this.cancelButton = page.locator("//span[.=' Hủy']")
        this.saveButton = page.locator("//span[.=' Lưu']")
        this.numberOfDaysOff = page.locator("//div/div[2]/div/div[7]/div/div/div/div[3]/div/input")
        this.chosseButton = page.locator("//button[contains(text(),'Chọn')]")
        this.todayButton = page.locator("//div[@class='dp__cell_inner dp__pointer dp__today dp__date_hover']")
        this.reason = page.locator("//div/div[2]/div/div[5]/div/div/div/div[4]/textarea")
        this.endDate = page.locator("//div[2]/div/div[4]/div/div/div/div/div[1]/div/div/div[3]/input")
        this.startDate = page.locator("//div[2]/div/div[2]/div/div[3]/div/div/div/div/div[1]/div/div/div[3]/input")
        this.anualLeave = page.locator("//div[contains(text(),'Nghỉ theo phép năm')]")
        this.leaveTypeDropDown = page.locator("//div[@class='v-col-md-4 v-col-12']//div[@class='v-field__input']")
        this.addButton = page.locator("//span[normalize-space()='Thêm']")
        this.leaveApplicationButton = page.locator("//div[contains(text(),'Đơn nghỉ phép')]")
        this.searchButton = page.locator("//span[.=' Tìm kiếm']")
    }

    async clickTodayButton() {
        await this.safeClick(this.todayButton);
        await this.safeClick(this.chosseButton);

    }

    async clickSpecialLeave() {
        await this.safeClick(this.specialLeave);
    }

    async clickMaternityLeave() {
        await this.safeClick(this.maternityLeave);
    }

    async clickSocialInsuranceLeave() {
        await this.safeClick(this.socialInsuranceLeave);
    }

    async clickRegularLeave() {
        await this.safeClick(this.leaveTypeDropDown);
    }

    async clickBrowsedButton() {
        await this.safeClick(this.browsedButton);
    }

    async clickRow0() {
        await this.safeClick(this.Row0);
    }

    async clickSaveButton() {
        await this.safeClick(this.saveButton);
    }

    async fillNumberOfDaysOff(number: string) {
        await this.safeFill(this.numberOfDaysOff, number);
    }

    async clickChosseButton() {
        await this.safeClick(this.chosseButton);
    }

    async fillReason(reason: string) {
        await this.safeFill(this.reason, reason);
    }

    async clickEndDate() {
        await this.safeClick(this.endDate);
    }

    async clickStartDate() {
        await this.safeClick(this.startDate);
    }

    async clickAnualLeave() {
        await this.safeClick(this.anualLeave);
    }

    async clickLeaveTypeDropDown() {
        await this.safeClick(this.leaveTypeDropDown);
    }

    async clickAddButton() {
        await this.safeClick(this.leaveApplicationButton);
    }

    async clickLeaveApplicationButton() {
        await this.safeClick(this.leaveApplicationButton);
    }

    async getVerifyMaternityLeave() {
        return await this.getFirstVisibleText(this.verifyMaternityLeave, 'Maternity leave');
    }

    async getVerifySpecialLeave() {
        return await this.getFirstVisibleText(this.verifySpecialLeave, 'Special leave');
    }

    async getVerifySocialInsuranceLeave() {
        return await this.getFirstVisibleText(this.verifySocialInsuranceLeave, 'Social insurance leave');
    }

    async getVerifyRegularLeave() {
        return await this.getFirstVisibleText(this.verifyRegularLeave, 'Regular leave');
    }

    async getVerifyAnualLeave() {
        return await this.getFirstVisibleText(this.verifyAnualLeave, 'Anual leave');
    }


    async setDate() {
        await this.clickStartDate();
        await this.clickTodayButton();
        await this.clickEndDate();
        await this.clickTodayButton();
    }
}
