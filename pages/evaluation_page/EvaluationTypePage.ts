import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class EvaluationTypePage extends BasePage {
    readonly EVALUATION_TYPE_BUTTON: Locator;
    readonly EVALUATION_TYPE_NAME_INPUT: Locator;
    readonly SEARCH_EVALUATION_TYPE_INPUT: Locator;
    readonly EXPECTED_SEARCH_EVALUATION_TYPE_NAME: Locator;
    readonly DESCRIPTION_INPUT: Locator;
   
    constructor(page: Page) {
        super(page);
        this.DESCRIPTION_INPUT = page.getByRole('textbox', { name: 'Mô tả chi tiết' });
        this.EVALUATION_TYPE_BUTTON = page.locator("//div[contains(text(),'Loại đánh giá')]");
        this.EVALUATION_TYPE_NAME_INPUT = page.getByRole('textbox', { name: 'Tên loại đánh giá ※' });
        this.SEARCH_EVALUATION_TYPE_INPUT = page.getByRole('textbox', { name: 'Tên loại đánh giá ' });
        this.EXPECTED_SEARCH_EVALUATION_TYPE_NAME = page.locator("//tr[@id='row-0']//span[contains(text(),'Đánh giá chuyên cần')]");
    }

    async expectSearchEvaluationTypeName(SearchName: string) {
        await this.safeVerifyToHaveText(this.EXPECTED_SEARCH_EVALUATION_TYPE_NAME, SearchName);
    }

    async setSearchEvaluationTypeName(name: string) {
        await this.safeFill(this.SEARCH_EVALUATION_TYPE_INPUT, name);
    }

    async clickEvaluationType() {
        await this.safeClick(this.EVALUATION_TYPE_BUTTON);
    }

    async setEvaluationTypeName(name: string) {
        await this.safeFill(this.EVALUATION_TYPE_NAME_INPUT, name);
    }
}
