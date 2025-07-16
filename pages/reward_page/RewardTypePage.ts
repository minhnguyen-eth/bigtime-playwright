import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class RewardTypePage extends BasePage {
    readonly rewardTypeButton: Locator;
    readonly rewardTypeNameInput: Locator;
    readonly descriptionInput: Locator;
    readonly saveButton: Locator;
    readonly statusDropdownFormAdd: Locator;
    readonly lockStatus: Locator;
    readonly activityStatus: Locator;
    readonly requiredRewardTypeName: Locator;
    readonly inputSearch: Locator;
    readonly resultSearch: Locator;
    readonly verifyActivityStatus: Locator;
    readonly verifyLockStatus: Locator;
    readonly verifyDuplicateNameError: Locator;
    readonly verifyLockStatusRow1: Locator;

    constructor(page: Page) {
        super(page);
        this.verifyDuplicateNameError = page.locator("//li[contains(text(),'Tên đã tồn tại.')]");
        this.verifyLockStatus = page.locator("//tr[@id='row-0']//span[@class='custom-size'][normalize-space()='Khóa']");
        this.verifyLockStatusRow1 = page.locator("//tr[@id='row-1']//span[@class='custom-size'][contains(text(),'Khóa')]");
        this.verifyActivityStatus = page.locator("//tr[@id='row-0']//span[@class='custom-size'][contains(text(),'Hoạt động')]");
        this.resultSearch = page.locator("//tr[@id='row-0']//span[contains(text(),'Khen thưởng')]");
        this.activityStatus = page.locator("//div[contains(text(),'Hoạt động')]");
        this.inputSearch = page.getByRole('textbox', { name: 'Tên loại khen thưởng' });
        this.requiredRewardTypeName = page.locator("//div[contains(text(),'Nhập tên loại khen thưởng')]");
        this.lockStatus = page.locator("//div[contains(text(),'Khóa')]");
        this.statusDropdownFormAdd = page.getByRole('combobox').filter({ hasText: 'Trạng thái ※' }).locator('i');
        this.saveButton = page.locator("//span[contains(normalize-space(),'Lưu')]");
        this.rewardTypeNameInput = page.getByRole('textbox', { name: 'Tên loại khen thưởng ※' })
        this.descriptionInput = page.getByRole('textbox', { name: 'Mô tả' })
        this.rewardTypeButton = page.locator("//div[contains(text(),'Loại khen thưởng')]");
    }

    async VerifyDuplicateNameError() {
        await this.safeVerifyToHaveText(this.verifyDuplicateNameError, 'Tên đã tồn tại.');
    }

    async VerifyActivityStatus() {
        await this.safeVerifyToHaveText(this.verifyActivityStatus, 'Hoạt động');
    }

    async VerifyLockStatus() {
        await this.safeVerifyToHaveText(this.verifyLockStatus, 'Khóa');
    }

    async VerifyLockStatusRow1() {
        await this.safeVerifyToHaveText(this.verifyLockStatusRow1, 'Khóa');
    }

    async getResultSearch() {
        await this.safeVerifyTextContains(this.resultSearch, 'Khen thưởng');
    }

    async clickStatusActivity() {
        await this.safeClick(this.activityStatus);
    }

    async getRequiredRewardTypeName() {
        await this.safeVerifyToHaveText(this.requiredRewardTypeName, 'Nhập tên loại khen thưởng');
    }

    async clickStatusLock() {
        await this.safeClick(this.lockStatus);
    }

    async clickStatusDropdownFormAdd() {
        await this.safeClick(this.statusDropdownFormAdd);
    }

    async fillRewardTypeNameInput(rewardTypeName: string) {
        await this.safeFill(this.rewardTypeNameInput, rewardTypeName);
    }

    async fillDescriptionInput(description: string) {
        await this.safeFill(this.descriptionInput, description);
    }

    async fillInputSearch(search: string) {
        await this.safeFill(this.inputSearch, search);
    }

    async clickRewardTypeButton() {
        await this.safeClick(this.rewardTypeButton);
    }
}
