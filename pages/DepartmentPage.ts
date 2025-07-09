import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DepartmentPage extends BasePage {

    readonly departmentButton: Locator;
    readonly departmentNameInput: Locator;
    readonly noteInput: Locator;
    readonly dateCreateDepartment: Locator;
    readonly validateNameDepartment: Locator;
    readonly searchByNameDepartment: Locator;
    readonly searchByNameResult: Locator;

    constructor(page: Page) {
        super(page);
        this.searchByNameResult = page.locator("//tr[@id='row-0']//span[contains(text(),'Bộ phận IT')]");
        this.searchByNameDepartment = page.locator("//form/div/div[1]/div/div/div/div[3]/div/input");
        this.validateNameDepartment = page.locator("//div[contains(text(),'Nhập tên bộ phận')]");
        this.dateCreateDepartment = page.locator("//div[2]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.departmentNameInput = page.locator("//div[2]/div/div[1]/div/div/div/div[4]/div/input");
        this.departmentButton = page.locator("//div[contains(text(),'Bộ phận')]");
        this.noteInput = page.locator("//textarea");
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

    async fillNote(note: string) {
        await this.safeFill(this.noteInput, note);
    }

    async fillDepartmentName(department: string) {
        await this.safeFill(this.departmentNameInput, department);
    }

    async clickDepartment() {
        await this.safeClick(this.departmentButton);
    }


}