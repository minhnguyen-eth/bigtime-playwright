import { Locator, Page } from '@playwright/test';
import { ToastPage } from './ToastPage';
import { BasePage } from './BasePage';

export class PasswordPage extends BasePage {
    readonly page: Page;
    readonly AVATA_BUTTON: Locator;
    readonly CLICK_CHANGE_PASSWORD: Locator;
    readonly FILL_PASSWORD_OLD: Locator;
    readonly FILL_PASSWORD_NEW: Locator;
    readonly FILL_PASSWORD_CONFIRM: Locator;
    readonly VALIDATE_PASSWORD_OLD_FAILED : Locator;
    readonly VALIDATE_PASSWORD_CONFIRM_FAILED : Locator;    
    readonly VALIDATE_PASSWORD_OLD_EMPTY: Locator;
    readonly VALIDATE_PASSWORD_OLD_6_CHARACTERS: Locator;
    readonly VALIDATE_NEW_PASSWORD_EMPTY: Locator;
    readonly CLICK_LOGOUT_BUTTON: Locator;  
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.AVATA_BUTTON = page.locator('img.v-img__img.v-img__img--cover:visible');
        this.CLICK_CHANGE_PASSWORD = page.getByRole('link', { name: 'Đổi mật khẩu' });
        this.FILL_PASSWORD_OLD = page.getByRole('textbox', { name: 'Mật khẩu cũ ※ Mật khẩu cũ ※' }); 
        this.FILL_PASSWORD_NEW = page.getByRole('textbox', { name: 'Mật khẩu mới ※ Mật khẩu mới ※' });
        this.FILL_PASSWORD_CONFIRM = page.getByRole('textbox', { name: 'Nhập lại mật khẩu ※ Nhập lại' });
        this.VALIDATE_PASSWORD_OLD_FAILED = page.getByText('Nhập sai mật khẩu cũ', { exact: true });
        this.VALIDATE_PASSWORD_CONFIRM_FAILED = page.locator('div').filter({ hasText: /^Giá trị không khớp với Mật khẩu\.$/ }).first();
        this.VALIDATE_PASSWORD_OLD_EMPTY = page.locator('div').filter({ hasText: /^Nhập mật khẩu cũ$/ }).first();
        this.VALIDATE_PASSWORD_OLD_6_CHARACTERS = page.locator('div').filter({ hasText: /^Không nhập dưới 6 kí tự\.$/ }).first(); 
        this.VALIDATE_NEW_PASSWORD_EMPTY = page.locator('div').filter({ hasText: /^Nhập mật khẩu mới$/ }).first();  
        this.CLICK_LOGOUT_BUTTON = page.locator('button.v-btn.v-theme--lightColor13.v-btn--density-default.rounded-lg.v-btn--size-default.v-btn--variant-outlined.mx-2');
    }


    async clickAvataButton() {
        await this.safeClick(this.AVATA_BUTTON);
    }
    
    async clickChangePassword() {
        await this.safeClick(this.CLICK_CHANGE_PASSWORD);
    }

    async fillPasswordOld(passwordOld: string) {
        await this.FILL_PASSWORD_OLD.fill(passwordOld);
    }

    async fillPasswordNew(passwordNew: string) {
        await this.FILL_PASSWORD_NEW.fill(passwordNew);
    }
    async fillPasswordConfirm(passwordConfirm: string) {
        await this.FILL_PASSWORD_CONFIRM.fill(passwordConfirm);
    }

    async changePassword(passwordOld: string, passwordNew: string, passwordConfirm: string) {
        await this.fillPasswordOld(passwordOld);
        await this.fillPasswordNew(passwordNew);
        await this.fillPasswordConfirm(passwordConfirm);
    
    }

    //validate
    async validatePasswordOldFailed() {
        await this.safeVerifyToHaveText(this.VALIDATE_PASSWORD_OLD_FAILED, 'Nhập sai mật khẩu cũ');
    }

    async validatePasswordConfirmFailed() {
        await this.safeVerifyToHaveText(this.VALIDATE_PASSWORD_CONFIRM_FAILED, 'Giá trị không khớp với Mật khẩu.');
    }

    async validatePasswordOldEmpty() {
        await this.safeVerifyToHaveText(this.VALIDATE_PASSWORD_OLD_EMPTY, 'Nhập mật khẩu cũ');
    }

    async validatePasswordOld6Characters() {  
        await this.safeVerifyToHaveText(this.VALIDATE_PASSWORD_OLD_6_CHARACTERS, 'Không nhập dưới 6 kí tự.');
    }

    async validateNewPasswordEmpty() {  
        await this.safeVerifyToHaveText(this.VALIDATE_NEW_PASSWORD_EMPTY, 'Nhập mật khẩu mới');
    }

    async clickLogoutButton() {
        await this.safeClick(this.CLICK_LOGOUT_BUTTON);
    }


}