import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DepartmentPage extends BasePage {
    readonly departmentButton: Locator;
    readonly departmentNameInput: Locator;
    readonly dateCreateDepartment: Locator;
    readonly validateNameDepartment: Locator;
    readonly searchByNameDepartment: Locator;
    readonly searchByNameResult: Locator;

    constructor(page: Page) {
        super(page);
        this.searchByNameResult = page.locator("//tr[@id='row-0']//span[contains(text(),'Bộ phận IT')]");
        this.searchByNameDepartment = page.getByRole('textbox', { name: 'Tên bộ phận' });
        this.validateNameDepartment = page.locator("//div[contains(text(),'Nhập tên bộ phận')]");
        this.dateCreateDepartment = page.getByRole('textbox', { name: 'Ngày thành lập ※' });
        this.departmentNameInput = page.getByRole('textbox', { name: 'Tên bộ phận ※' });
        this.departmentButton = page.locator("//div[contains(text(),'Bộ phận')]");
    }

    async verifySearchByNameResult() {
        await this.safeVerifyToHaveText(this.searchByNameResult, "Bộ phận IT");
    }

    async fillSearchByNameDepartment(name: string) {
        await this.safeFill(this.searchByNameDepartment, name);
    }

    async verifyValidateNameDepartment() {
        await this.safeVerifyToHaveText(this.validateNameDepartment, "Nhập tên bộ phận");
    }

    async clickDateCreateDepartment() {
        await this.safeClick(this.dateCreateDepartment);
    }

    async fillDepartmentName(department: string) {
        await this.safeFill(this.departmentNameInput, department);
    }

    async clickDepartment() {
        await this.safeClick(this.departmentButton);
    }
}
