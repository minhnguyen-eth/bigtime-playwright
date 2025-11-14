import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class BranchPage extends BasePage {
    readonly BRANCH_BUTTON: Locator;
    readonly BRANCH_NAME_INPUT: Locator;
    readonly SHORT_NAME_INPUT: Locator;
    readonly BRANCH_ADDRESS_INPUT: Locator;
    readonly PHONE_NUMBER_INPUT: Locator;
    readonly NUMBER_OF_EMPLOYEE_INPUT: Locator;

    readonly VALIDATE_BRANCH_NAME: Locator;
    readonly VALIDATE_SHORTNAME_REQUIRED: Locator;
    readonly VALIDATE_BRANCH_EXIST: Locator;
    readonly VALIDATE_SHORTNAME_EXIST: Locator;
    readonly VALIDATE_PHONE_NUMBER: Locator;
    readonly VALIDATE_MAX_NUMBER_OF_EMPLOYEE: Locator;
    readonly VALIDATE_MIN_NUMBER_OF_EMPLOYEE: Locator;

    readonly SEARCH_BY_BRANCH_NAME: Locator;
    readonly SEARCH_BY_NAME_RESULT: Locator;

    constructor(page: Page) {
        super(page);

        this.BRANCH_BUTTON = page.locator("//div[contains(text(),'Chi nhánh')]");
        this.BRANCH_NAME_INPUT = page.getByRole('textbox', { name: 'Tên chi nhánh' }).nth(1);
        this.SHORT_NAME_INPUT = page.getByRole('textbox', { name: 'Tên ngắn' });
        this.BRANCH_ADDRESS_INPUT = page.getByRole('textbox', { name: 'Địa chỉ' });
        this.PHONE_NUMBER_INPUT = page.getByRole('spinbutton', { name: 'Điện thoại ※' });
        this.NUMBER_OF_EMPLOYEE_INPUT = page.getByRole('spinbutton', { name: 'Số lượng nhân viên tối đa ※' });

        this.VALIDATE_BRANCH_NAME = page.locator("//div[contains(text(),'Nhập tên chi nhánh')]");
        this.VALIDATE_SHORTNAME_REQUIRED = page.getByText("Nhập tên ngắn");
        this.VALIDATE_BRANCH_EXIST = page.getByText('Tên chi nhánh đã tồn tại.');
        this.VALIDATE_SHORTNAME_EXIST = page.locator("//li[contains(text(),'Tên ngắn đã tồn tại.')]");
        this.VALIDATE_PHONE_NUMBER = page.locator("//div[contains(text(),'Không nhập dưới 10 kí tự.')]");
        this.VALIDATE_MAX_NUMBER_OF_EMPLOYEE = page.locator("//div[contains(text(),'Giá trị phải nhỏ hơn hoặc bằng 1000.')]");
        this.VALIDATE_MIN_NUMBER_OF_EMPLOYEE = page.locator("//div[contains(text(),'Giá trị phải lớn hơn hoặc bằng 100.')]");

        this.SEARCH_BY_BRANCH_NAME = page.getByRole('textbox', { name: 'Tên chi nhánh' });
        this.SEARCH_BY_NAME_RESULT = page.locator("//tr[@id='row-0']//span[contains(text(),'Biên Hòa')]");
    }

    // ========================= Click Actions =========================
    async clickBranchButton() {
        await this.safeClick(this.BRANCH_BUTTON);
    }

    // ========================= Fill Actions =========================
    async fillBranchName(name: string) {
        await this.safeFill(this.BRANCH_NAME_INPUT, name);
    }

    async fillShortName(shortname: string) {
        await this.safeFill(this.SHORT_NAME_INPUT, shortname);
    }

    async fillBranchAddress(address: string) {
        await this.safeFill(this.BRANCH_ADDRESS_INPUT, address);
    }

    async fillPhoneNumber(phoneNumber: string) {
        await this.safeFill(this.PHONE_NUMBER_INPUT, phoneNumber);
    }

    async fillNumberOfEmployee(number: string) {
        await this.safeFill(this.NUMBER_OF_EMPLOYEE_INPUT, number);
    }

    async fillSearchByBranchName(name: string) {
        await this.safeFill(this.SEARCH_BY_BRANCH_NAME, name);
    }

    // ========================= Verification =========================
    async verifySearchByNameResult(expectedName: string = 'Biên Hòa') {
        await this.safeVerifyToHaveText(this.SEARCH_BY_NAME_RESULT, expectedName);
    }

    async verifyBranchNameRequired() {
        await this.safeVerifyToHaveText(this.VALIDATE_BRANCH_NAME, "Nhập tên chi nhánh");
    }

    async verifyShortNameRequired() {
        await this.safeVerifyToHaveText(this.VALIDATE_SHORTNAME_REQUIRED, "Nhập tên ngắn");
    }

    async verifyBranchExist() {
        await this.safeVerifyToHaveText(this.VALIDATE_BRANCH_EXIST, 'Tên chi nhánh đã tồn tại.');
    }

    async verifyShortNameExist() {
        await this.safeVerifyToHaveText(this.VALIDATE_SHORTNAME_EXIST, 'Tên ngắn đã tồn tại.');
    }

    async verifyPhoneNumber() {
        await this.safeVerifyToHaveText(this.VALIDATE_PHONE_NUMBER, "Không nhập dưới 10 kí tự.");
    }

    async verifyMaxNumberOfEmployee() {
        await this.safeVerifyToHaveText(this.VALIDATE_MAX_NUMBER_OF_EMPLOYEE, 'Giá trị phải nhỏ hơn hoặc bằng 1000.');
    }

    async verifyMinNumberOfEmployee() {
        await this.safeVerifyToHaveText(this.VALIDATE_MIN_NUMBER_OF_EMPLOYEE, 'Giá trị phải lớn hơn hoặc bằng 100.');
    }
}
