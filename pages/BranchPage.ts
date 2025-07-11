import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BranchPage extends BasePage {

    readonly branchButton: Locator;
    readonly branchName: Locator;
    readonly shortName: Locator;
    readonly branchAddress: Locator;
    readonly branchCity: Locator;
    readonly branchState: Locator;
    readonly branchZip: Locator;
    readonly branchPhone: Locator;
    readonly branchEmail: Locator;
    readonly branchWebsite: Locator;
    readonly branchSaveButton: Locator;
    readonly branchCancelButton: Locator;
    readonly branchDeleteButton: Locator;
    readonly phoneNumber: Locator;
    readonly numberOfEmployee: Locator;
    readonly noteInput: Locator;
    readonly validateMaxNumberOfEmployee: Locator;
    readonly validateMinNumberOfEmployee: Locator;
    readonly validateBranchExist: Locator;
    readonly validateShortnameRequired: Locator;
    readonly validateBranchName: Locator;
    readonly validatePhoneNumber: Locator
    readonly validateShortNameExist: Locator;
    readonly searchByBranchName: Locator;
    readonly searchByNameResult: Locator;


    constructor(page: Page) {
        super(page);
        this.searchByNameResult = page.locator("//tr[@id='row-0']//span[contains(text(),'Biên Hòa')]");
        this.searchByBranchName = page.locator("//form/div/div[1]/div/div/div/div[3]/div/input");
        this.validateShortNameExist = page.locator("//li[contains(text(),'Tên ngắn đã tồn tại.')]");
        this.validatePhoneNumber = page.locator("//div[contains(text(),'Không nhập dưới 10 kí tự.')]");
        this.validateBranchName = page.locator("//div[contains(text(),'Nhập tên chi nhánh')]");
        this.validateShortnameRequired = page.locator("//div[contains(text(),'Nhập tên ngắn')]");
        this.validateBranchExist = page.locator("//li[contains(text(),'Tên chi nhánh đã tồn tại.')]");
        this.validateMaxNumberOfEmployee = page.locator("//div[contains(text(),'Giá trị phải nhỏ hơn hoặc bằng 1000.')]");
        this.validateMinNumberOfEmployee = page.locator("//div[contains(text(),'Giá trị phải lớn hơn hoặc bằng 100.')]");
        this.numberOfEmployee = page.locator("//div[2]/div/div[4]/div/div/div/div[4]/div/input");
        this.phoneNumber = page.locator("//div[2]/div/div[3]/div/div/div/div[4]/div/input");
        this.branchButton = page.locator("//div[contains(text(),'Chi nhánh')]");
        this.branchName = page.locator("//div[2]/div/div[1]/div/div/div/div[4]/div/input");
        this.shortName = page.locator("//div[2]/div/div[2]/div/div/div/div[4]/div/input");
        this.branchAddress = page.locator("//div[2]/div/div[6]/div/div/div/div[3]/div/input");
        this.noteInput = page.locator("//textarea");
    }
    async fillSearchByBranchName(name: string) {
        await this.safeFill(this.searchByBranchName, name);
    }

    async verifySearchByNameResult() {
        await this.safeVerifyToHaveText(this.searchByNameResult, 'Biên Hòa');
    }

    async verifyShortNameExist() {
        await this.safeVerifyToHaveText(this.validateShortNameExist, 'Tên ngắn đã tồn tại.');
    }

    async verifyPhoneNumber() {
        await this.safeVerifyToHaveText(this.validatePhoneNumber, "Không nhập dưới 10 kí tự.");
    }

    async verifyBranchNameRequired() {
        await this.safeVerifyToHaveText(this.validateBranchName, "Nhập tên chi nhánh");
    }

    async verifyShortNameRequired() {
        await this.safeVerifyToHaveText(this.validateShortnameRequired, "Nhập tên ngắn");
    }

    async verifyBranchExist() {
        await this.safeVerifyToHaveText(this.validateBranchExist, 'Tên chi nhánh đã tồn tại.');
    }

    async verifyMaxNumberOfEmployee() {
        await this.safeVerifyToHaveText(this.validateMaxNumberOfEmployee, 'Giá trị phải nhỏ hơn hoặc bằng 1000.');
    }

    async verifyMinNumberOfEmployee() {
        await this.safeVerifyToHaveText(this.validateMinNumberOfEmployee, 'Giá trị phải lớn hơn hoặc bằng 100.');
    }

    async fillNoteInput(note: string) {
        await this.safeFill(this.noteInput, note);
    }

    async fillBranchAddress(address: string) {
        await this.safeFill(this.branchAddress, address);
    }

    async fillNumberOfEmployee(numberOfEmployee: string) {
        await this.safeFill(this.numberOfEmployee, numberOfEmployee);
    }

    async fillPhoneNumber(phoneNumber: string) {
        await this.safeFill(this.phoneNumber, phoneNumber);
    }

    async fillShortName(shortname: string) {
        await this.safeFill(this.shortName, shortname);
    }

    async fillBranchName(name: string) {
        await this.safeFill(this.branchName, name);
    }

    async clickBranchButton() {
        await this.safeClick(this.branchButton);
    }

}