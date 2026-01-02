import { Locator, Page } from '@playwright/test';
import { ToastPage } from './ToastPage';
import { BasePage } from './BasePage';

export class PasswordPage extends BasePage {
    readonly page: Page;
    readonly AVATA_BUTTON: Locator;
    readonly CHANGE_PASSWORD_BUTTON: Locator;
    readonly OLD_PASSWORD_INPUT: Locator;
    readonly NEW_PASSWORD_INPUT: Locator;
    readonly CONFIRM_PASSWORD_INPUT: Locator;
    readonly VALIDATE_OLD_PASSWORD_FAILED: Locator;
    readonly VALIDATE_CONFIRM_PASSWORD_FAILED: Locator;
    readonly VALIDATE_OLD_PASSWORD_EMPTY: Locator;
    readonly VALIDATE_OLD_PASSWORD_6_CHARACTERS: Locator;
    readonly VALIDATE_NEW_PASSWORD_EMPTY: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.AVATA_BUTTON = page.locator('img.v-img__img.v-img__img--cover:visible');
        this.CHANGE_PASSWORD_BUTTON = page.getByRole('link', { name: 'Đổi mật khẩu' });
        this.OLD_PASSWORD_INPUT = page.getByRole('textbox', { name: 'Mật khẩu cũ ※ Mật khẩu cũ ※' });
        this.NEW_PASSWORD_INPUT = page.getByRole('textbox', { name: 'Mật khẩu mới ※ Mật khẩu mới ※' });
        this.CONFIRM_PASSWORD_INPUT = page.getByRole('textbox', { name: 'Nhập lại mật khẩu ※ Nhập lại' });
        this.VALIDATE_OLD_PASSWORD_FAILED = page.getByText('Nhập sai mật khẩu cũ', { exact: true });
        this.VALIDATE_CONFIRM_PASSWORD_FAILED = page.locator('div').filter({ hasText: /^Giá trị không khớp với Mật khẩu\.$/ }).first();
        this.VALIDATE_OLD_PASSWORD_EMPTY = page.locator('div').filter({ hasText: /^Nhập mật khẩu cũ$/ }).first();
        this.VALIDATE_OLD_PASSWORD_6_CHARACTERS = page.locator('div').filter({ hasText: /^Không nhập dưới 6 kí tự\.$/ }).first();
        this.VALIDATE_NEW_PASSWORD_EMPTY = page.locator('div').filter({ hasText: /^Nhập mật khẩu mới$/ }).first();
    }


    async clickAvataButton() {
        await this.safeClick(this.AVATA_BUTTON);
    }

    async clickChangePassword() {
        await this.safeClick(this.CHANGE_PASSWORD_BUTTON);
    }

    async fillOldPassword(oldPassword: string) {
        await this.safeFill(this.OLD_PASSWORD_INPUT, oldPassword);
    }

    async fillNewPassword(newPassword: string) {
        await this.safeFill(this.NEW_PASSWORD_INPUT, newPassword);
    }
    async fillConfirmPassword(confirmPassword: string) {
        await this.safeFill(this.CONFIRM_PASSWORD_INPUT, confirmPassword);
    }

    async handleChangePassword(
        {
            oldPassword,
            newPassword,
            confirmPassword,
        }: {
            oldPassword: string;
            newPassword: string;
            confirmPassword: string;
        }
    ) {
        await this.fillOldPassword(oldPassword);
        await this.fillNewPassword(newPassword);
        await this.fillConfirmPassword(confirmPassword);
    }

    //validate
    async validateOldPasswordFailed() {
        await this.safeVerifyToHaveText(this.VALIDATE_OLD_PASSWORD_FAILED, 'Nhập sai mật khẩu cũ');
    }

    async validaeConfirmPasswordFailed() {
        await this.safeVerifyToHaveText(this.VALIDATE_CONFIRM_PASSWORD_FAILED, 'Giá trị không khớp với Mật khẩu.');
    }

    async validateOldPasswordEmpty() {
        await this.safeVerifyToHaveText(this.VALIDATE_OLD_PASSWORD_EMPTY, 'Nhập mật khẩu cũ');
    }

    async validateOldPassword6Characters() {
        await this.safeVerifyToHaveText(this.VALIDATE_OLD_PASSWORD_6_CHARACTERS, 'Không nhập dưới 6 kí tự.');
    }

    async validateNewPasswordEmpty() {
        await this.safeVerifyToHaveText(this.VALIDATE_NEW_PASSWORD_EMPTY, 'Nhập mật khẩu mới');
    }
}
