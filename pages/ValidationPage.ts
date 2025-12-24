import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ValidationPage extends BasePage {
    readonly MINLENGTH_EMAIL = this.page.getByText('Không nhập dưới 6 kí tự.');
    readonly CONTRACT_ALREADY_APPROVED = this.page.getByText('Đã có hợp đồng được duyệt');
    readonly NAME_ALREADY_EXISTS = this.page.getByText('Tên đã tồn tại.');
    readonly REQUIRED_FILL_REASON = this.page.getByText('Nhập lý do');
    readonly MAX_LENGTH_255_CHARACTERS = this.page.getByText('Không nhập quá 255 kí tự.');
    readonly MAX_LENGTH_245_CHARACTERS = this.page.getByText('Không nhập quá 245 kí tự.');
    readonly MAX_LENGTH_500_CHARACTERS = this.page.getByText('Không nhập quá 500 kí tự.');
    readonly MAX_LENGTH_20_CHARACTERS = this.page.getByText('Không nhập quá 20 kí tự.');
    readonly MAX_LENGTH_100_CHARACTERS = this.page.getByText('Không nhập quá 100 kí tự.');
    readonly MAX_LENGTH_50_CHARACTERS = this.page.getByText('Không nhập quá 50 kí tự.');
    readonly NO_EXIST_DATA = this.page.getByText('Không có dữ liệu');
    readonly REQUIRED_FILL_NAME = this.page.getByText('Nhập họ và tên');

    constructor(page: Page) {
        super(page);
    }

    async validateRequiredFillName() {
        await this.validate(this.REQUIRED_FILL_NAME, 'Nhập họ và tên');
    }

    async validateMinlengthEmail() {
        await this.validate(this.MINLENGTH_EMAIL, 'Không nhập dưới 6 kí tự.');
    }

    async validateMaxLength245Characters() {
        await this.validate(this.MAX_LENGTH_245_CHARACTERS, 'Không nhập quá 245 kí tự.');
    }

    async validateMaxLength50Characters() {
        await this.validate(this.MAX_LENGTH_50_CHARACTERS, 'Không nhập quá 50 kí tự.');
    }

    async validate(locator: Locator, expected: string) {
        await this.safeVerifyToHaveText(locator, expected);
    }

    async validateNoExistData() {
        await this.validate(this.NO_EXIST_DATA, 'Không có dữ liệu');
    }

    async validateNameAlreadyExists() {
        await this.validate(this.NAME_ALREADY_EXISTS, 'Tên đã tồn tại.');
    }

    async validateRequiredFillReason() {
        await this.validate(this.REQUIRED_FILL_REASON, 'Nhập lý do');
    }

    async validateContractAlreadyApproved() {
        await this.validate(this.CONTRACT_ALREADY_APPROVED, 'Đã có hợp đồng được duyệt');
    }

    async validateMaxLength255Characters() {
        await this.validate(this.MAX_LENGTH_255_CHARACTERS, 'Không nhập quá 255 kí tự.');
    }

    async validateMaxLength100Characters() {
        await this.validate(this.MAX_LENGTH_100_CHARACTERS, 'Không nhập quá 100 kí tự.');
    }

    async validateMaxLength20Characters() {
        await this.validate(this.MAX_LENGTH_20_CHARACTERS, 'Không nhập quá 20 kí tự.');
    }

    async validateMaxLength500Characters() {
        await this.validate(this.MAX_LENGTH_500_CHARACTERS, 'Không nhập quá 500 kí tự.');
    }
}
