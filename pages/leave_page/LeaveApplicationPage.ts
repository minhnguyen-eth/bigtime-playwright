import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { selectDateOffset } from '../../utils/dateUtils';

export class LeaveApplicationPage extends BasePage {
    readonly LEAVE_APPLICATION_BUTTON: Locator;
    readonly LEAVE_TYPE_DROPDOWN: Locator;
    readonly START_DATE: Locator;
    readonly END_DATE: Locator;
    readonly NUMBER_OF_DAYS_OFF: Locator;
    readonly ANNUAL_LEAVE: Locator;
    readonly REGULAR_LEAVE: Locator;
    readonly SPECIAL_LEAVE: Locator;
    readonly SOCIAL_INSURANCE_LEAVE: Locator;
    readonly MATERNITY_LEAVE: Locator;
    readonly CLOSE_DATE_PICKER_1: Locator;
    readonly CLOSE_DATE_PICKER_2: Locator;
    readonly VERIFY_SPECIAL_LEAVE: Locator;
    readonly VERIFY_MATERNITY_LEAVE: Locator;
    readonly VERIFY_SOCIAL_INSURANCE_LEAVE: Locator;
    readonly VERIFY_REGULAR_LEAVE: Locator;
    readonly VERIFY_ANNUAL_LEAVE: Locator;
    readonly REST_TYPE_COMBOBOX: Locator;
    readonly SEARCH_BY_ANNUAL_LEAVE: Locator;
    readonly SEARCH_BY_SPECIAL_LEAVE: Locator;
    readonly SEARCH_BY_MATERNITY_LEAVE: Locator;
    readonly SEARCH_BY_SOCIAL_INSURANCE_LEAVE: Locator;
    readonly SEARCH_BY_REGULAR_LEAVE: Locator;
    readonly CLOSE_SEARCH_BY_MONTH: Locator;
    readonly CANCEL_BUTTON_SEARCH: Locator;
    readonly BROWSED_BUTTON_SEARCH: Locator;
    readonly WAIT_FOR_BROWSED_BUTTON_SEARCH: Locator;
    readonly REJECT_BUTTON_SEARCH: Locator;
    readonly SEARCH_BY_CANCEL_RESULT: Locator;
    readonly SEARCH_BY_WAIT_FOR_BROWSED_RESULT: Locator;
    readonly SEARCH_BY_REJECTED_RESULT: Locator;
    readonly SEARCH_BY_BROWSED_RESULT: Locator;
    readonly TEXTBOX_SEARCH_BY_MONTH: Locator;
    readonly MONTH_OPTION: Locator;
    readonly SEARCH_BY_MONTH_RESULT: Locator;
    readonly LABEL_LEAVE_APPLICATION: Locator;
    readonly SELECT_NEW_STATUS: Locator;
    readonly END_DATE_MUST_AFTER_START_DATE: Locator;
 
    constructor(page: Page) {
        super(page);
        this.END_DATE_MUST_AFTER_START_DATE = page.getByText('Ngày kết thúc phải là ngày sau hoặc bằng ngày bắt đầu.', { exact: true });
        this.SELECT_NEW_STATUS = page.getByRole('option', { name: 'Mới' });
        this.CLOSE_DATE_PICKER_2 = page.locator("//div[@class='v-row']/div[4]/div[1]/div[1]/div[1]/div[1]//*[name()='svg']");
        this.CLOSE_DATE_PICKER_1 = page.getByRole('dialog').locator('path').first();
        this.LABEL_LEAVE_APPLICATION = page.getByRole('main').getByText('Đơn nghỉ phép');
        this.SEARCH_BY_MONTH_RESULT = page.getByText('11-06-').first();
        this.MONTH_OPTION = page.getByText('Thg 6');
        this.TEXTBOX_SEARCH_BY_MONTH = page.getByRole('textbox', { name: 'Chọn tháng' });
        this.REJECT_BUTTON_SEARCH = page.getByRole('option', { name: 'Từ chối' });
        this.CANCEL_BUTTON_SEARCH = page.getByRole('option', { name: 'Hủy' });
        this.WAIT_FOR_BROWSED_BUTTON_SEARCH = page.getByRole('option', { name: 'Chờ duyệt' });
        this.BROWSED_BUTTON_SEARCH = page.getByRole('option', { name: 'Đã duyệt' });
        this.CLOSE_SEARCH_BY_MONTH = page.locator('svg');
        this.REST_TYPE_COMBOBOX = page.getByRole('combobox').filter({ hasText: 'Loại ngày nghỉ' });
        this.SEARCH_BY_BROWSED_RESULT = page.locator('#row-0').getByRole('cell', { name: 'Đã duyệt' });
        this.SEARCH_BY_REJECTED_RESULT = page.locator('#row-0').getByRole('cell', { name: 'Từ chối' });
        this.SEARCH_BY_CANCEL_RESULT = page.locator('#row-0').getByRole('cell', { name: 'Đã hủy' });
        this.SEARCH_BY_WAIT_FOR_BROWSED_RESULT = page.locator('#row-0').getByRole('cell', { name: 'Chờ duyệt' });
        this.SEARCH_BY_SOCIAL_INSURANCE_LEAVE = page.getByRole('option', { name: 'Nghỉ bảo hiểm xã hội' });
        this.SEARCH_BY_MATERNITY_LEAVE = page.getByRole('option', { name: 'Nghỉ thai sản' });
        this.SEARCH_BY_SPECIAL_LEAVE = page.getByRole('option', { name: 'Nghỉ đặc biệt' });
        this.SEARCH_BY_REGULAR_LEAVE = page.getByRole('option', { name: 'Nghỉ thường' });
        this.SEARCH_BY_ANNUAL_LEAVE = page.getByRole('option', { name: 'Nghỉ theo phép năm' });
       

        this.SPECIAL_LEAVE = page.locator("//div[contains(text(),'Nghỉ đặc biệt')]");
        this.MATERNITY_LEAVE = page.locator("//div[contains(text(),'Nghỉ thai sản')]");
        this.SOCIAL_INSURANCE_LEAVE = page.locator("//div[contains(text(),'Nghỉ bảo hiểm xã hội')]");
        this.REGULAR_LEAVE = page.locator("//div[contains(text(),'Nghỉ thường')]");
        this.NUMBER_OF_DAYS_OFF = page.getByRole('spinbutton', { name: 'Số ngày nghỉ Số ngày nghỉ' });
        this.END_DATE = page.getByRole('textbox', { name: 'Đến hết ngày ※' });
        this.START_DATE = page.getByRole('textbox', { name: 'Nghỉ từ ngày ※' });
        this.ANNUAL_LEAVE = page.locator("//div[contains(text(),'Nghỉ theo phép năm')]");
        this.LEAVE_TYPE_DROPDOWN = page.getByRole('combobox').filter({ hasText: 'Loại ngày nghỉ ※Nghỉ' });
        this.LEAVE_APPLICATION_BUTTON = page.getByRole('link', { name: 'Đơn nghỉ phép' });

        // verify
        this.VERIFY_SPECIAL_LEAVE = page.locator('#row-0 span').filter({ hasText: 'Nghỉ đặc biệt' });
        this.VERIFY_MATERNITY_LEAVE = page.locator('#row-0 span').filter({ hasText: 'Nghỉ thai sản' });
        this.VERIFY_SOCIAL_INSURANCE_LEAVE = page.locator('#row-0 span').filter({ hasText: 'Nghỉ bảo hiểm xã hội' });
        this.VERIFY_REGULAR_LEAVE = page.locator('#row-0 span').filter({ hasText: 'Nghỉ thường' });
        this.VERIFY_ANNUAL_LEAVE = page.locator('#row-0 span').filter({ hasText: 'Nghỉ theo phép năm' });
    }

    async verifyEndDateMustAfterStartDate() {
        await this.safeVerifyToHaveText(this.END_DATE_MUST_AFTER_START_DATE, 'Ngày kết thúc phải là ngày sau hoặc bằng ngày bắt đầu.');
    }

    async selectStartDateAfterToday() {
        await this.clickStartDate();
        await selectDateOffset(this.page, 1);
        await this.clickChoose();
    }

    async clickSelectNewStatus() {
        await this.safeClick(this.SELECT_NEW_STATUS);
    }

    async clickCloseDatePicker2() {
        await this.safeClick(this.CLOSE_DATE_PICKER_2);
    }

    async clickCloseDatePicker() {
        await this.CLOSE_DATE_PICKER_2.click();
    }

    async clickCloseDatePicker1() {
        await this.safeClick(this.CLOSE_DATE_PICKER_1);
    }

    async clickLabelLeaveApplication() {
        await this.safeClick(this.LABEL_LEAVE_APPLICATION);
    }

    async expectSearchByMonthResult() {
        await this.safeVerifyTextContains(this.SEARCH_BY_MONTH_RESULT, '11-06-');
    }

    async searchByMonth() {
        // await this.clickCloseSearchByMonth();
        await this.clickClearSearch();
        await this.clickTextboxSearchByMonth();
        await this.clickBackYear();
        await this.clickMonthOption();
        
        await this.clickSearch();
    }

    async clickBackYear() {
        await this.safeClick(this.BACK_YEAR);
    }

    async clickTextboxSearchByMonth() {
        await this.safeClick(this.TEXTBOX_SEARCH_BY_MONTH);
    }

    async clickMonthOption() {
        await this.safeClick(this.MONTH_OPTION);
        await this.clickChoose();
    }

    async expectSearchByCancelResult() {
        await this.safeVerifyToHaveText(this.SEARCH_BY_CANCEL_RESULT, 'Đã hủy');
    }

    async expectSearchByWaitForBrowsedResult() {
        await this.safeVerifyToHaveText(this.SEARCH_BY_WAIT_FOR_BROWSED_RESULT, 'Chờ duyệt');
    }

    async expectSearchByRejectedResult() {
        await this.safeVerifyToHaveText(this.SEARCH_BY_REJECTED_RESULT, 'Từ chối');
    }

    async expectSearchByBrowsedResult() {
        await this.safeVerifyToHaveText(this.SEARCH_BY_BROWSED_RESULT, 'Đã duyệt');
    }

    async clickCancelButtonSearch() {
        await this.clickDropdownStatusSearch();
        await this.safeClick(this.CANCEL_BUTTON_SEARCH);
        await this.clickLabelLeaveApplication();
        await this.clickSearch();
    }

    async clickRejectButtonSearch() {
        await this.clickDropdownStatusSearch();
        await this.safeClick(this.REJECT_BUTTON_SEARCH);
        await this.clickLabelLeaveApplication();
        await this.clickSearch();
    }

    async clickBrowsedButtonSearch() {
        await this.clickDropdownStatusSearch();
        await this.safeClick(this.BROWSED_BUTTON_SEARCH);
        await this.clickLabelLeaveApplication();
        await this.clickSearch();
    }

    async clickWaitForBrowsedButtonSearch() {
        await this.clickDropdownStatusSearch();
        await this.safeClick(this.WAIT_FOR_BROWSED_BUTTON_SEARCH);
        await this.clickLabelLeaveApplication();
        await this.clickSearch();
    }

    async clickCloseSearchByMonth() {
        await this.safeClick(this.CLOSE_SEARCH_BY_MONTH);
    }

    async clickRestTypeComboBox() {
        await this.safeClick(this.REST_TYPE_COMBOBOX);
    }

    async clickSearchByAnnualLeave() {
        await this.clickRestTypeComboBox();
        await this.safeClick(this.SEARCH_BY_ANNUAL_LEAVE);
        await this.clickSearch();
    }

    async clickSearchBySpecialLeave() {
        await this.clickRestTypeComboBox();
        await this.safeClick(this.SEARCH_BY_SPECIAL_LEAVE);
        await this.clickSearch();
    }

    async clickSearchByMaternityLeave() {
        await this.clickRestTypeComboBox();
        await this.safeClick(this.SEARCH_BY_MATERNITY_LEAVE);
        await this.clickSearch();
    }

    async clickSearchBySocialInsuranceLeave() {
        await this.clickRestTypeComboBox();
        await this.safeClick(this.SEARCH_BY_SOCIAL_INSURANCE_LEAVE);
        await this.clickSearch();
    }

    async clickSearchByRegularLeave() {
        await this.clickRestTypeComboBox();
        await this.safeClick(this.SEARCH_BY_REGULAR_LEAVE);
        await this.clickSearch();
    }

    async clickSpecialLeave() {
        await this.safeClick(this.SPECIAL_LEAVE);
    }

    async clickMaternityLeave() {
        await this.safeClick(this.MATERNITY_LEAVE);
    }

    async clickSocialInsuranceLeave() {
        await this.safeClick(this.SOCIAL_INSURANCE_LEAVE);
    }

    async clickRegularLeave() {
        await this.safeClick(this.LEAVE_TYPE_DROPDOWN);
    }

    async fillNumberOfDaysOff(number: string) {
        await this.safeFill(this.NUMBER_OF_DAYS_OFF, number);
    }

    async clickEndDate() {
        await this.safeClick(this.END_DATE);
    }

    async clickStartDate() {
        await this.safeClick(this.START_DATE);
    }

    async clickAnnualLeave() {
        await this.safeClick(this.ANNUAL_LEAVE);
    }

    async clickLeaveTypeDropDown() {
        await this.safeClick(this.LEAVE_TYPE_DROPDOWN);
    }

    async clickLeaveApplicationButton() {
        await this.safeClick(this.LEAVE_APPLICATION_BUTTON);
    }

    async getVerifyMaternityLeave() {
        await this.safeVerifyTextContains(this.VERIFY_MATERNITY_LEAVE, 'Nghỉ thai sản');
    }

    async getVerifySpecialLeave() {
        await this.safeVerifyTextContains(this.VERIFY_SPECIAL_LEAVE, 'Nghỉ đặc biệt');
    }

    async getVerifySocialInsuranceLeave() {
        await this.safeVerifyTextContains(this.VERIFY_SOCIAL_INSURANCE_LEAVE, 'Nghỉ bảo hiểm xã hội');
    }

    async getVerifyRegularLeave() {
        await this.safeVerifyToHaveText(this.VERIFY_REGULAR_LEAVE, 'Nghỉ thường');
    }

    async getVerifyAnnualLeave() {
        await this.safeVerifyTextContains(this.VERIFY_ANNUAL_LEAVE, 'Nghỉ theo phép năm');
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