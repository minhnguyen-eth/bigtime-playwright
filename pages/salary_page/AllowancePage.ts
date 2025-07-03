import { Locator, Page, expect } from 'playwright/test';

export class AllowancePage {
    readonly page: Page;
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
    readonly validationNameMaxLength255: Locator;
    readonly validationNoteMaxLength500: Locator;
    readonly activityStatus: Locator;
    readonly nameAllowanceSearch: Locator;
    readonly allowanceTypeDropdownSearch: Locator;
    readonly searchNameResult: Locator;
    readonly allowanceTypeDaily: Locator;
    readonly allowanceTypeDailyResult: Locator;
    readonly allowanceTypeMonthlyResult: Locator;

    constructor(page: Page) {
        this.page = page;
        this.allowanceTypeMonthlyResult = page.locator("//tr[@id='row-0']//div[@class='v-chip__content'][normalize-space()='Hàng tháng']");
        this.allowanceTypeDailyResult = page.locator("//tr[@id='row-0']//div[@class='v-chip__content'][normalize-space()='Hàng ngày']");
        this.allowanceTypeDaily = page.locator("//div[contains(text(),'Hàng ngày')]");
        this.searchNameResult = page.locator("//tr[@id='row-0']//span[contains(text(),'Phụ cấp tiền ăn')]");
        this.allowanceTypeDropdownSearch = page.locator("//div[@class='v-card-text master-table-search pb-0 pl-0']//div[2]//div[1]//div[1]//div[1]//div[4]//i[1]");
        this.nameAllowanceSearch = page.locator("//form/div/div[1]/div/div/div/div[3]/div/input");
        this.validationNoteMaxLength500 = page.locator("//div[contains(text(),'Không nhập quá 500 kí tự.')]");
        this.validationNameMaxLength255 = page.locator("//div[contains(text(),'Không nhập quá 255 kí tự.')]");
        this.activityStatus = page.locator("//div[contains(text(),'Hoạt động')]");
        this.validationNameExist = page.locator("//li[contains(text(),'Tên đã tồn tại.')]");
        this.validationMoney = page.locator("//div[contains(text(),'Nhập tiền phụ cấp')]");
        this.validattionMaxLength = page.locator("//div[contains(text(),'Không nhập quá 255 kí tự.')]");
        this.allowanceTypeMonthly = page.locator("//div[contains(text(),'Hàng tháng')]");
        this.msgAllowanceNameRequired = page.locator("//div[contains(text(),'Nhập tên phụ cấp')]");
        this.allowanceTypeDropdown = page.locator("//i[@class='mdi mdi-form-select mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']");
        this.lockStatus = page.locator("//div[contains(text(),'Khóa')]");
        this.statusDropdown = page.locator("//i[@class='mdi-book-lock-open-outline mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']");
        this.noteInput = page.locator("//div[2]/div/div[5]/div/div/div/div[4]/textarea");
        this.allowanceNameInput = page.locator("//div[2]/div/div[1]/div/div/div/div[4]/div/input");
        this.allowanceMoneyInput = page.locator("//div[2]/div/div[2]/div/div/div/div[4]/input");
        this.allowanceButton = page.locator("//div[contains(text(),'Loại phụ cấp')]");
    }


    async checkAllowanceTypeMonthlyResult() {
        await this.allowanceTypeMonthlyResult.isVisible();
        await expect(this.allowanceTypeMonthlyResult).toHaveText('Hàng tháng');
    }

    async checkAllowanceTypeDailyResult() {
        await this.allowanceTypeDailyResult.isVisible();
        await expect(this.allowanceTypeDailyResult).toHaveText('Hàng ngày');
    }

    async clickAllowanceTypeDaily() {
        await this.allowanceTypeDaily.click();
    }

    async checkSearchNameResult() {
        await this.searchNameResult.isVisible();
        await expect(this.searchNameResult).toHaveText('Phụ cấp tiền ăn');
    }

    async fillNameAllowanceSearch(name: string) {
        await this.nameAllowanceSearch.fill(name);
    }

    async clickAllowanceTypeDropdownSearch() {
        await this.allowanceTypeDropdownSearch.click();
    }

    async clickActivityStatus() {
        await this.activityStatus.click();
    }

    async clickMonthly() {
        await this.allowanceTypeMonthly.click();
    }

    async checkValidationNoteMaxLength500() {
        await this.validationNoteMaxLength500.isVisible();
        await expect(this.validationNoteMaxLength500).toHaveText('Không nhập quá 500 kí tự.');
    }

    async checkValidationNameMaxLength255() {
        await this.validationNameMaxLength255.isVisible();
        await expect(this.validationNameMaxLength255).toHaveText('Không nhập quá 255 kí tự.');
    }

    async checkValidationNameExist() {
        await this.validationNameExist.isVisible();
        await expect(this.validationNameExist).toHaveText('Tên đã tồn tại.');
    }

    async checkValidationMoneyRequired() {
        await this.validationMoney.isVisible();
        await expect(this.validationMoney).toHaveText('Nhập tiền phụ cấp');
    }

    async checkValidationMaxLength() {
        await this.validattionMaxLength.isVisible();
        await expect(this.validattionMaxLength).toHaveText('Không nhập quá 255 kí tự.');
    }

    async checkMsgAllowanceNameRequired() {
        await this.msgAllowanceNameRequired.isVisible();
        await expect(this.msgAllowanceNameRequired).toHaveText('Nhập tên phụ cấp');
    }

    async clickAllowanceTypeMonthly() {
        await this.allowanceTypeMonthly.click();
    }

    async clickAllowanceTypeDropdown() {
        await this.allowanceTypeDropdown.click();
    }

    async clickLockStatus() {
        await this.lockStatus.click();
    }

    async clickStatusDropdown() {
        await this.statusDropdown.click();
    }

    async fillNote(note: string) {
        await this.noteInput.fill(note);
    }

    async fillAllwanceName(name: string) {
        await this.allowanceNameInput.fill(name);
    }

    async fillAllwanceMoney(money: string) {
        await this.allowanceMoneyInput.fill(money);
    }

    async clickAllowance() {
        await this.allowanceButton.click();
    }

}