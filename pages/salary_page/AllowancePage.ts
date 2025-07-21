import { Locator, Page, expect } from 'playwright/test';
import { BasePage } from '../BasePage';

export class AllowancePage extends BasePage {
    readonly allowanceButton: Locator;
    readonly allowanceNameInput: Locator;
    readonly allowanceMoneyInput: Locator;
    readonly allowanceTypeDropdown: Locator;
    readonly allowanceTypeMonthly: Locator;
    readonly statusDropdown: Locator;
    readonly msgAllowanceNameRequired: Locator;
    readonly validationMoney: Locator;
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
        this.validationMoney = page.locator("//div[contains(text(),'Nhập tiền phụ cấp')]");
        this.allowanceTypeMonthly = page.locator("//div[contains(text(),'Hàng tháng')]");
        this.msgAllowanceNameRequired = page.locator("//div[contains(text(),'Nhập tên phụ cấp')]");
        this.allowanceTypeDropdown = page.getByRole('combobox').filter({ hasText: 'Loại phụ cấp ※' }).locator('i').nth(1);
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

    async clickMonthly() {
        await this.safeClick(this.allowanceTypeMonthly);
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