import { Locator, Page, expect } from 'playwright/test';
import { BasePage } from '../BasePage';

export class AllowancePage extends BasePage {

    readonly allowanceButton: Locator;
    readonly allowanceNameInput: Locator;
    readonly allowanceMoneyInput: Locator;
    readonly noteInput: Locator;
    readonly allowanceTypeDropdown: Locator;
    readonly allowanceTypeMonthly: Locator;
    readonly statusDropdown: Locator;
    readonly lockStatus: Locator;
    readonly msgAllowanceNameRequired: Locator;
    readonly validattionMaxLength: Locator;
    readonly validationMoney: Locator;
    readonly validationNameExist: Locator;
    readonly activityStatus: Locator;
    readonly nameAllowanceSearch: Locator;
    readonly allowanceTypeDropdownSearch: Locator;
    readonly searchNameResult: Locator;
    readonly allowanceTypeDaily: Locator;
    readonly allowanceTypeDailyResult: Locator;
    readonly allowanceTypeMonthlyResult: Locator;

    constructor(page: Page) {
        super(page);
        this.allowanceTypeMonthlyResult = page.locator("//tr[@id='row-0']//div[@class='v-chip__content'][normalize-space()='Hàng tháng']");
        this.allowanceTypeDailyResult = page.locator("//tr[@id='row-0']//div[@class='v-chip__content'][normalize-space()='Hàng ngày']");
        this.allowanceTypeDaily = page.locator("//div[contains(text(),'Hàng ngày')]");
        this.searchNameResult = page.locator("//tr[@id='row-0']//span[contains(text(),'Phụ cấp tiền ăn')]");
        this.allowanceTypeDropdownSearch = page.getByRole('combobox').filter({ hasText: 'Loại phụ cấp' }).locator('i');
        this.nameAllowanceSearch = page.getByRole('textbox', { name: 'Tên phụ cấp' });
        this.activityStatus = page.locator("//div[contains(text(),'Hoạt động')]");
        this.validationNameExist = page.locator("//li[contains(text(),'Tên đã tồn tại.')]");
        this.validationMoney = page.locator("//div[contains(text(),'Nhập tiền phụ cấp')]");
        this.validattionMaxLength = page.locator("//div[contains(text(),'Không nhập quá 255 kí tự.')]");
        this.allowanceTypeMonthly = page.locator("//div[contains(text(),'Hàng tháng')]");
        this.msgAllowanceNameRequired = page.locator("//div[contains(text(),'Nhập tên phụ cấp')]");
        this.allowanceTypeDropdown = page.getByRole('combobox').filter({ hasText: 'Loại phụ cấp ※Hàng ngàyLoại' }).locator('i').nth(1);
        this.lockStatus = page.locator("//div[contains(text(),'Khóa')]");
        this.statusDropdown = page.getByRole('combobox').filter({ hasText: 'Trạng thái ※' }).locator('i').nth(1);
        this.noteInput = page.locator("//div[2]/div/div[5]/div/div/div/div[4]/textarea");
        this.allowanceNameInput = page.getByRole('textbox', { name: 'Tên phụ cấp ※' })
        this.allowanceMoneyInput = page.getByRole('textbox', { name: 'Tiền phụ cấp ※' })
        this.allowanceButton = page.locator("//div[contains(text(),'Loại phụ cấp')]");
    }

    async checkAllowanceTypeMonthlyResult() {
        await this.safeVerifyToHaveText(this.allowanceTypeMonthlyResult, 'Hàng tháng');
    }

    async checkAllowanceTypeDailyResult() {
        await this.safeVerifyToHaveText(this.allowanceTypeDailyResult, 'Hàng ngày');
    }

    async clickAllowanceTypeDaily() {
        await this.safeClick(this.allowanceTypeDaily);
    }

    async checkSearchNameResult() {
        await this.safeClick(this.searchNameResult);
    }

    async fillNameAllowanceSearch(name: string) {
        await this.safeFill(this.nameAllowanceSearch, name);
    }

    async clickAllowanceTypeDropdownSearch() {
        await this.safeClick(this.allowanceTypeDropdownSearch);
    }

    async clickActivityStatus() {
        await this.safeClick(this.activityStatus);
    }

    async clickMonthly() {
        await this.safeClick(this.allowanceTypeMonthly);
    }

    async checkValidationNameExist() {
        await this.safeVerifyToHaveText(this.validationNameExist, 'Tên đã tồn tại.');
    }

    async checkValidationMoneyRequired() {
        await this.safeVerifyToHaveText(this.validationMoney, 'Nhập tiền phụ cấp');
    }

    async checkMsgAllowanceNameRequired() {
        await this.safeVerifyToHaveText(this.msgAllowanceNameRequired, 'Nhập tên phụ cấp');
    }

    async clickAllowanceTypeMonthly() {
        await this.safeClick(this.allowanceTypeMonthly);
    }

    async clickAllowanceTypeDropdown() {
        await this.safeClick(this.allowanceTypeDropdown);
    }

    async clickLockStatus() {
        await this.safeClick(this.lockStatus);
    }

    async clickStatusDropdown() {
        await this.safeClick(this.statusDropdown);
    }

    async fillNote(note: string) {
        await this.safeFill(this.noteInput, note);
    }

    async fillAllwanceName(name: string) {
        await this.safeFill(this.allowanceNameInput, name);
    }

    async fillAllwanceMoney(money: string) {
        await this.safeFill(this.allowanceMoneyInput, money);
    }

    async clickAllowance() {
        await this.safeClick(this.allowanceButton);
    }
}