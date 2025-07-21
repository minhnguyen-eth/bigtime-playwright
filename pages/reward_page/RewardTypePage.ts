import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class RewardTypePage extends BasePage {
    readonly rewardTypeButton: Locator;
    readonly rewardTypeNameInput: Locator;
    readonly requiredRewardTypeName: Locator;
    readonly inputSearch: Locator;
    readonly resultSearch: Locator;

    constructor(page: Page) {
        super(page);
        this.resultSearch = page.locator("//tr[@id='row-0']//span[contains(text(),'Khen thưởng')]");
        this.inputSearch = page.getByRole('textbox', { name: 'Tên loại khen thưởng' });
        this.requiredRewardTypeName = page.locator("//div[contains(text(),'Nhập tên loại khen thưởng')]");
        this.rewardTypeNameInput = page.getByRole('textbox', { name: 'Tên loại khen thưởng ※' })
        this.rewardTypeButton = page.locator("//div[contains(text(),'Loại khen thưởng')]");
    }

    async getResultSearch() {
        await this.safeVerifyTextContains(this.resultSearch, 'Khen thưởng');
    }

    async getRequiredRewardTypeName() {
        await this.safeVerifyToHaveText(this.requiredRewardTypeName, 'Nhập tên loại khen thưởng');
    }

    async fillRewardTypeNameInput(rewardTypeName: string) {
        await this.safeFill(this.rewardTypeNameInput, rewardTypeName);
    }

    async fillInputSearch(search: string) {
        await this.safeFill(this.inputSearch, search);
    }

    async clickRewardTypeButton() {
        await this.safeClick(this.rewardTypeButton);
    }
}
