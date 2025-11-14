import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DepartmentPage extends BasePage {
    readonly DEPARTMENT_BUTTON: Locator;
    readonly DEPARTMENT_NAME_INPUT: Locator;
    readonly DATE_CREATE_DEPARTMENT: Locator;
    readonly VALIDATE_NAME_DEPARTMENT: Locator;
    readonly SEARCH_BY_NAME_DEPARTMENT: Locator;
    readonly SEARCH_BY_NAME_RESULT: Locator;

    constructor(page: Page) {
        super(page);
        this.SEARCH_BY_NAME_RESULT = page.locator("//tr[@id='row-0']//span[contains(text(),'Bộ phận IT')]");
        this.SEARCH_BY_NAME_DEPARTMENT = page.getByRole('textbox', { name: 'Tên bộ phận' });
        this.VALIDATE_NAME_DEPARTMENT = page.locator("//div[contains(text(),'Nhập tên bộ phận')]");
        this.DATE_CREATE_DEPARTMENT = page.getByRole('textbox', { name: 'Ngày thành lập ※' });
        this.DEPARTMENT_NAME_INPUT = page.getByRole('textbox', { name: 'Tên bộ phận ※' });
        this.DEPARTMENT_BUTTON = page.locator("//div[contains(text(),'Bộ phận')]");
    }

    async verifySearchByNameResult() {
        await this.safeVerifyToHaveText(this.SEARCH_BY_NAME_RESULT, "Bộ phận IT");
    }

    async fillSearchByNameDepartment(name: string) {
        await this.safeFill(this.SEARCH_BY_NAME_DEPARTMENT, name);
    }

    async verifyValidateNameDepartment() {
        await this.safeVerifyToHaveText(this.VALIDATE_NAME_DEPARTMENT, "Nhập tên bộ phận");
    }

    async clickDateCreateDepartment() {
        await this.safeClick(this.DATE_CREATE_DEPARTMENT);
    }

    async fillDepartmentName(department: string) {
        await this.safeFill(this.DEPARTMENT_NAME_INPUT, department);
    }

    async clickDepartment() {
        await this.safeClick(this.DEPARTMENT_BUTTON);
    }
}