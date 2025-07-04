import { Page, Locator ,expect} from "@playwright/test";

export class DepartmentPage {
    readonly page: Page;
    readonly departmentButton: Locator;
    readonly departmentNameInput: Locator;
    readonly noteInput: Locator;
    readonly dateCreateDepartment: Locator;
    readonly validateNameDepartment: Locator;
    readonly searchByNameDepartment: Locator;
    readonly searchByNameResult: Locator;
    


    constructor(page: Page) {
        this.page = page;
        this.searchByNameResult = page.locator("//tr[@id='row-0']//span[contains(text(),'Bộ phận IT')]");
        this.searchByNameDepartment = page.locator("//form/div/div[1]/div/div/div/div[3]/div/input");
        this.validateNameDepartment = page.locator("//div[contains(text(),'Nhập tên bộ phận')]");
        this.dateCreateDepartment = page.locator("//div[2]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.departmentNameInput = page.locator("//div[2]/div/div[1]/div/div/div/div[4]/div/input");
        this.departmentButton = page.locator("//div[contains(text(),'Bộ phận')]");
        this.noteInput = page.locator("//textarea");
    }


    async verifySearchByNameResult() {
        await expect(this.searchByNameResult).toBeVisible();
        await expect(this.searchByNameResult).toHaveText("Bộ phận IT");
    }

    async fillSearchByNameDepartment(name: string) {
        await this.searchByNameDepartment.fill(name);
    }

    async verifyValidateNameDepartment() {
        await expect(this.validateNameDepartment).toBeVisible();
        await expect(this.validateNameDepartment).toHaveText("Nhập tên bộ phận");
    }

    async clickDateCreateDepartment() {
        await this.dateCreateDepartment.click();
    }

    async fillNote(note: string) {
        await this.noteInput.fill(note);
    }

    async fillDepartmentName(department: string) {
        await this.departmentNameInput.fill(department);
    }

    async clickDepartment() {
        await this.departmentButton.click();
    }

}