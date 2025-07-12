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
    readonly closeDatePicker1: Locator;
    readonly closeDatePicker2: Locator;

    // verify type of leave
    readonly verifySpecialLeave: Locator;
    readonly verifyMaternityLeave: Locator;
    readonly verifySocialInsuranceLeave: Locator;
    readonly verifyRegularLeave: Locator;
    readonly verifyAnualLeave: Locator;

    //Search 
    readonly restTypeComboBox: Locator;
    readonly searchByAnualLeave: Locator;
    readonly searchBySpecialLeave: Locator;
    readonly searchByMaternityLeave: Locator;
    readonly searchBySocialInsuranceLeave: Locator;
    readonly searchByRegularLeave: Locator;
    readonly closeSearchByMonth: Locator;
    readonly statusComboBoxSearch: Locator;
    readonly cancelButtonSearch: Locator;
    readonly browsedButtonSearch: Locator;
    readonly waitForBrowsedButtonSearch: Locator;
    readonly rejectButtonSearch: Locator;
    readonly searchByCancelResult: Locator;
    readonly searchByWaitForBrowsedResult: Locator;
    readonly searchByRejectedResult: Locator;
    readonly searchByBrowsedResult: Locator;
    readonly texboxSearchByMonth: Locator;
    readonly monthOption: Locator;
    readonly searchByMonthResult: Locator;
    readonly labelLeaveApplication: Locator;

    constructor(page: Page) {
        super(page);
        this.closeDatePicker2 = page.locator("//div[@class='v-row']/div[4]/div[1]/div[1]/div[1]/div[1]//*[name()='svg']")
        this.closeDatePicker1 = page.getByRole('dialog').locator('path').first()
        this.labelLeaveApplication = page.getByRole('main').getByText('Đơn nghỉ phép')
        this.searchByMonthResult = page.getByText('11-06-').first()
        this.monthOption = page.getByText('Thg 6')
        this.texboxSearchByMonth = page.getByRole('textbox', { name: 'Chọn tháng' })
        this.rejectButtonSearch = page.getByRole('option', { name: 'Từ chối' })
        this.cancelButtonSearch = page.getByRole('option', { name: 'Hủy' })
        this.waitForBrowsedButtonSearch = page.getByRole('option', { name: 'Chờ duyệt' })
        this.browsedButtonSearch = page.getByRole('option', { name: 'Đã duyệt' })
        this.statusComboBoxSearch = page.getByRole('combobox').filter({ hasText: 'Trạng thái Trạng thái' })
        this.closeSearchByMonth = page.locator('svg')
        this.restTypeComboBox = page.getByRole('combobox').filter({ hasText: 'Loại ngày nghỉ Loại ngày nghỉ' })

        // SEARCH
        this.searchByBrowsedResult = page.locator('#row-0').getByRole('cell', { name: 'Đã duyệt' })
        this.searchByRejectedResult = page.locator('#row-0').getByRole('cell', { name: 'Từ chối' })
        this.searchByCancelResult = page.locator('#row-0').getByRole('cell', { name: 'Hủy' })
        this.searchByWaitForBrowsedResult = page.locator('#row-0').getByRole('cell', { name: 'Chờ duyệt' })
        this.searchBySocialInsuranceLeave = page.getByRole('option', { name: 'Nghỉ bảo hiểm xã hội' })
        this.searchByMaternityLeave = page.getByRole('option', { name: 'Nghỉ thai sản' })
        this.searchBySpecialLeave = page.getByRole('option', { name: 'Nghỉ đặc biệt' })
        this.searchByRegularLeave = page.getByRole('option', { name: 'Nghỉ thường' })
        this.searchByAnualLeave = page.getByRole('option', { name: 'Nghỉ theo phép năm' })

        // VERYFICATION
        this.verifySpecialLeave = page.getByText('Nghỉ đặc biệt', { exact: true }).first()
        this.verifyMaternityLeave = page.getByText('Nghỉ thai sản', { exact: true }).first()
        this.verifySocialInsuranceLeave = page.getByText('Nghỉ bảo hiểm xã hội ', { exact: true }).first()
        this.verifyRegularLeave = page.getByText('Nghỉ thường', { exact: true }).first()
        this.verifyAnualLeave = page.getByText('Nghỉ theo phép năm', { exact: true }).first()

        // ELEMENTS
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
        this.numberOfDaysOff = page.getByRole('spinbutton', { name: 'Số ngày nghỉ Số ngày nghỉ' })
        this.reason = page.locator("//div/div[2]/div/div[5]/div/div/div/div[4]/textarea")
        this.endDate = page.getByRole('textbox', { name: 'Đến hết ngày ※' })
        this.startDate = page.getByRole('textbox', { name: 'Nghỉ từ ngày ※ Nghỉ từ ngày ※' })
        this.anualLeave = page.locator("//div[contains(text(),'Nghỉ theo phép năm')]")
        this.leaveTypeDropDown = page.getByRole('combobox').filter({ hasText: 'Loại ngày nghỉ ※Nghỉ' })
        this.addButton = page.locator("//span[normalize-space()='Thêm']")
        this.leaveApplicationButton = page.locator("//div[contains(text(),'Đơn nghỉ phép')]")
        this.searchButton = page.getByRole('button', { name: 'Tìm kiếm' })
    }

    async clickCloseDatePicker2() {
        await this.safeClick(this.closeDatePicker2);
    }

    async clickCloseDatePicker() {
        await (this.closeDatePicker2).click();
    }

    async clickCloseDatePicker1() {
        await this.safeClick(this.closeDatePicker1);
    }

    async clickLabelLeaveApplication() {
        await this.safeClick(this.labelLeaveApplication);
    }

    async expectSearchByMonthResult() {
        await this.safeVerifyTextContains(this.searchByMonthResult, '11-06-');
    }

    async searchByMonth() {
        // await this.clickCloseSearchByMonth();
        await this.clickClearSearch();
        await this.clickTexboxSearchByMonth();
        await this.clickMonthOption();
        await this.clickSearchButton();
    }

    async clickTexboxSearchByMonth() {
        await this.safeClick(this.texboxSearchByMonth);
    }

    async clickMonthOption() {
        await this.safeClick(this.monthOption);
    }

    async clickSearchButton() {
        await this.safeClick(this.searchButton);
    }

    async expectSearchByCancelResult() {
        await this.safeVerifyToHaveText(this.searchByCancelResult, 'Hủy');
    }

    async expectSearchByWaitForBrowsedResult() {
        await this.safeVerifyToHaveText(this.searchByWaitForBrowsedResult, 'Chờ duyệt');
    }

    async expectSearchByRejectedResult() {
        await this.safeVerifyToHaveText(this.searchByRejectedResult, 'Từ chối');
    }

    async expectSearchByBrowsedResult() {
        await this.safeVerifyToHaveText(this.searchByBrowsedResult, 'Đã duyệt');
    }

    async clickCancelButtonSearch() {
        await this.clickClearSearch();
        await this.clickStatusComboBoxSearch();
        await this.safeClick(this.cancelButtonSearch);
        await this.clickLabelLeaveApplication();
        await this.clickSearchButton();
    }

    async clickRejectButtonSearch() {
        await this.clickClearSearch();
        await this.clickStatusComboBoxSearch();
        await this.safeClick(this.rejectButtonSearch);
        await this.clickLabelLeaveApplication();
        await this.clickSearchButton();
    }

    async clickBrowsedButtonSearch() {
        await this.clickClearSearch();
        await this.clickStatusComboBoxSearch();
        await this.safeClick(this.browsedButtonSearch);
        await this.clickLabelLeaveApplication();
        await this.clickSearchButton();
    }

    async clickWaitForBrowsedButtonSearch() {
        await this.clickClearSearch();
        await this.clickStatusComboBoxSearch();
        await this.safeClick(this.waitForBrowsedButtonSearch);
        await this.clickLabelLeaveApplication();
        await this.clickSearchButton();
    }

    async clickStatusComboBoxSearch() {
        await this.safeClick(this.statusComboBoxSearch);
    }

    async clickCloseSearchByMonth() {
        await this.safeClick(this.closeSearchByMonth);
    }

    async clickRestTypeComboBox() {
        await this.safeClick(this.restTypeComboBox);
    }

    async clickSearchByAnualLeave() {
        await this.clickClearSearch();
        await this.clickRestTypeComboBox();
        await this.safeClick(this.searchByAnualLeave);
        await this.clickSearchButton();
    }

    async clickSearchBySpecialLeave() {
        await this.clickClearSearch();
        await this.clickRestTypeComboBox();
        await this.safeClick(this.searchBySpecialLeave);
        await this.clickSearchButton();
    }

    async clickSearchByMaternityLeave() {
        await this.clickClearSearch();
        await this.clickRestTypeComboBox();
        await this.safeClick(this.searchByMaternityLeave);
        await this.clickSearchButton();
    }

    async clickSearchBySocialInsuranceLeave() {
        await this.clickClearSearch();
        await this.clickRestTypeComboBox();
        await this.safeClick(this.searchBySocialInsuranceLeave);
        await this.clickSearchButton();
    }

    async clickSearchByRegularLeave() {
        await this.clickRestTypeComboBox();
        await this.safeClick(this.searchByRegularLeave);
        await this.clickSearchButton();
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
        await this.safeVerifyTextContains(this.verifyMaternityLeave, 'Nghỉ thai sản');
        return await this.getFirstVisibleText(this.verifyMaternityLeave, 'Maternity leave');
    }

    async getVerifySpecialLeave() {
        await this.safeVerifyTextContains(this.verifySpecialLeave, 'Nghỉ đặc biệt');
        return await this.getFirstVisibleText(this.verifySpecialLeave, 'Special leave');
    }

    async getVerifySocialInsuranceLeave() {
        await this.safeVerifyTextContains(this.verifySocialInsuranceLeave, 'Nghỉ bảo hiểm xã hội');
        return await this.getFirstVisibleText(this.verifySocialInsuranceLeave, 'Social insurance leave');
    }

    async getVerifyRegularLeave() {
        await this.safeVerifyTextContains(this.verifyRegularLeave, 'Nghỉ thường');
        return await this.getFirstVisibleText(this.verifyRegularLeave, 'Regular leave');
    }

    async getVerifyAnualLeave() {
        await this.safeVerifyTextContains(this.verifyAnualLeave, 'Nghỉ theo phép năm');
        return await this.getFirstVisibleText(this.verifyAnualLeave, 'Anual leave');
    }

    async setDate() {
        await this.clickStartDate();
        await this.clickTodayDatePicker();
        await this.clickEndDate();
        await this.clickTodayDatePicker();
    }

    async setDateForEdit() {

        await this.clickCloseDatePicker();
        await this.clickEndDate();
        await this.clickTodayDatePicker();
    }
}
