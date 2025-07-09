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
    readonly statusDrodownSearch: Locator;
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
        this.statusDrodownSearch = page.locator("//div[@class='v-field v-field--appended v-field--center-affix v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//div[@class='v-field__input']");
        this.inputSearch = page.locator("//form/div/div[1]/div/div/div/div[3]/div/input");
        this.requiredRewardTypeName = page.locator("//div[contains(text(),'Nhập tên loại khen thưởng')]");
        this.lockStatus = page.locator("//div[contains(text(),'Khóa')]");
        this.statusDropdownFormAdd = page.locator("//div[@class='v-field v-field--active v-field--appended v-field--center-affix v-field--dirty v-field--prepended v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//div[@class='v-field__input']");
        this.saveButton = page.locator("//span[contains(normalize-space(),'Lưu')]");
        this.rewardTypeNameInput = page.locator("//div[2]/div/div[1]/div/div/div/div[3]/div/input");
        this.descriptionInput = page.locator("//div[2]/div/div/div/div[3]/textarea");
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

    async clickStatusDropdownSearch() {
        await this.safeClick(this.statusDrodownSearch);
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
