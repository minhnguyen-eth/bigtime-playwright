import { Locator, Page, expect } from "@playwright/test";


export class EvaluationProcessPage {
    private page: Page;
    private evaluationProcessButton: Locator;
    private addButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.evaluationProcessButton = page.locator("//div[contains(text(),'Quy trình đánh giá')]");
        this.addButton = page.locator("//span[normalize-space()='Thêm']");
        
    }

    async clickEvaluationType() {
        await this.evaluationProcessButton.click();
    }
   

}




