import { Locator, Page, expect } from 'playwright/test';
import { BasePage } from '../BasePage';

export class AllowancePage extends BasePage {
    readonly ALLOWANCE_BUTTON: Locator;
    readonly ALLOWANCE_NAME_INPUT: Locator;
    readonly ALLOWANCE_MONEY_INPUT: Locator;
    readonly ALLOWANCE_TYPE_DROPDOWN: Locator;
    readonly ALLOWANCE_TYPE_MONTHLY: Locator;
    readonly MSG_ALLOWANCE_NAME_REQUIRED: Locator;
    readonly VALIDATION_MONEY: Locator;
    readonly NAME_ALLOWANCE_SEARCH: Locator;
    readonly ALLOWANCE_TYPE_DROPDOWN_SEARCH: Locator;
    readonly SEARCH_NAME_RESULT: Locator;
    readonly ALLOWANCE_TYPE_DAILY: Locator;
    readonly ALLOWANCE_TYPE_DAILY_RESULT: Locator;
    readonly ALLOWANCE_TYPE_MONTHLY_RESULT: Locator;
    readonly YES_RADIO: Locator;
    readonly TAX_RATE_INPUT: Locator;

    constructor(page: Page) {
        super(page);
        this.TAX_RATE_INPUT = page.getByRole('textbox', { name: 'Mức tính thuế từ ※' });
        this.YES_RADIO = page.getByRole('radio', { name: 'Có' });
        this.ALLOWANCE_TYPE_MONTHLY_RESULT = page.locator("//tr[@id='row-0']//div[@class='v-chip__content'][normalize-space()='Hàng tháng']");
        this.ALLOWANCE_TYPE_DAILY_RESULT = page.locator("//tr[@id='row-0']//div[@class='v-chip__content'][normalize-space()='Hàng ngày']");
        this.ALLOWANCE_TYPE_DAILY = page.locator("//div[contains(text(),'Hàng ngày')]");
        this.SEARCH_NAME_RESULT = page.locator("//tr[@id='row-0']//span[contains(text(),'Phụ cấp tiền ăn')]");
        this.ALLOWANCE_TYPE_DROPDOWN_SEARCH = page.getByRole('combobox').filter({ hasText: 'Loại phụ cấp' }).locator('i');
        this.NAME_ALLOWANCE_SEARCH = page.getByRole('textbox', { name: 'Tên phụ cấp' });
        this.VALIDATION_MONEY = page.locator("//div[contains(text(),'Nhập tiền phụ cấp')]");
        this.ALLOWANCE_TYPE_MONTHLY = page.locator("//div[contains(text(),'Hàng tháng')]");
        this.MSG_ALLOWANCE_NAME_REQUIRED = page.locator("//div[contains(text(),'Nhập tên phụ cấp')]");
        this.ALLOWANCE_TYPE_DROPDOWN = page.getByRole('combobox').filter({ hasText: 'Loại phụ cấp ※' }).locator('i').nth(1);
        this.ALLOWANCE_NAME_INPUT = page.getByRole('textbox', { name: 'Tên phụ cấp ※' });
        this.ALLOWANCE_MONEY_INPUT = page.getByRole('textbox', { name: 'Tiền phụ cấp ※' });
        this.ALLOWANCE_BUTTON = page.locator("//div[contains(text(),'Loại phụ cấp')]");
    }

    async fillTaxRate(rate: string) {
        await this.safeFill(this.TAX_RATE_INPUT, rate);
    }

    async checkAllowanceTypeMonthlyResult() {
        await this.safeVerifyToHaveText(this.ALLOWANCE_TYPE_MONTHLY_RESULT, 'Hàng tháng');
    }

    async checkAllowanceTypeDailyResult() {
        await this.safeVerifyToHaveText(this.ALLOWANCE_TYPE_DAILY_RESULT, 'Hàng ngày');
    }

    async clickAllowanceTypeDaily() {
        await this.safeClick(this.ALLOWANCE_TYPE_DAILY);
    }

    async checkSearchNameResult() {
        await this.safeClick(this.SEARCH_NAME_RESULT);
    }

    async fillNameAllowanceSearch(name: string) {
        await this.safeFill(this.NAME_ALLOWANCE_SEARCH, name);
    }

    async clickAllowanceTypeDropdownSearch() {
        await this.safeClick(this.ALLOWANCE_TYPE_DROPDOWN_SEARCH);
    }

    async clickMonthly() {
        await this.safeClick(this.ALLOWANCE_TYPE_MONTHLY);
    }

    async checkValidationMoneyRequired() {
        await this.safeVerifyToHaveText(this.VALIDATION_MONEY, 'Nhập tiền phụ cấp');
    }

    async checkMsgAllowanceNameRequired() {
        await this.safeVerifyToHaveText(this.MSG_ALLOWANCE_NAME_REQUIRED, 'Nhập tên phụ cấp');
    }

    async clickAllowanceTypeMonthly() {
        await this.safeClick(this.ALLOWANCE_TYPE_MONTHLY);
    }

    async clickAllowanceTypeDropdown() {
        await this.safeClick(this.ALLOWANCE_TYPE_DROPDOWN);
    }
    
    async fillAllowanceName(name: string) {
        await this.safeFill(this.ALLOWANCE_NAME_INPUT, name);
    }

    async fillAllowanceMoney(money: string) {
        await this.safeFill(this.ALLOWANCE_MONEY_INPUT, money);
    }

    async clickAllowance() {
        await this.safeClick(this.ALLOWANCE_BUTTON);
    }
}