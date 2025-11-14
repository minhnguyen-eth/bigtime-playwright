import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class RewardTypePage extends BasePage {
    readonly REWARD_TYPE_BUTTON: Locator;
    readonly REWARD_TYPE_NAME_INPUT: Locator;
    readonly REQUIRED_REWARD_TYPE_NAME: Locator;
    readonly INPUT_SEARCH: Locator;
    readonly RESULT_SEARCH: Locator;

    constructor(page: Page) {
        super(page);
        this.RESULT_SEARCH = page.locator("//tr[@id='row-0']//span[contains(text(),'Khen thưởng')]");
        this.INPUT_SEARCH = page.getByRole('textbox', { name: 'Tên loại khen thưởng' });
        this.REQUIRED_REWARD_TYPE_NAME = page.locator("//div[contains(text(),'Nhập tên loại khen thưởng')]");
        this.REWARD_TYPE_NAME_INPUT = page.getByRole('textbox', { name: 'Tên loại khen thưởng ※' });
        this.REWARD_TYPE_BUTTON = page.locator("//div[contains(text(),'Loại khen thưởng')]");
    }

    async getResultSearch() {
        await this.safeVerifyTextContains(this.RESULT_SEARCH, 'Khen thưởng');
    }

    async getRequiredRewardTypeName() {
        await this.safeVerifyToHaveText(this.REQUIRED_REWARD_TYPE_NAME, 'Nhập tên loại khen thưởng');
    }

    async fillRewardTypeNameInput(rewardTypeName: string) {
        await this.safeFill(this.REWARD_TYPE_NAME_INPUT, rewardTypeName);
    }

    async fillInputSearch(search: string) {
        await this.safeFill(this.INPUT_SEARCH, search);
    }

    async clickRewardTypeButton() {
        await this.safeClick(this.REWARD_TYPE_BUTTON);
    }
}
