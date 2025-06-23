import { Page, Locator, expect } from "@playwright/test";
export class DebtPage {
    readonly page: Page;
    readonly debtButton: Locator;
    readonly addButton: Locator;
    readonly editButton: Locator;
    readonly deleteButton: Locator;
    readonly searchNameInput: Locator;
    readonly chosesearchName: Locator;
    readonly searchButton: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    readonly requiredErrorNameMessage: Locator;
    readonly requiredErrorAmountMessage: Locator;
    readonly requiredErrorNoteMessage: Locator;
    readonly requiredErrorReasonMessage: Locator;
    readonly inputName: Locator;
    readonly inputAmount: Locator;
    readonly inputNote: Locator;
    readonly chosenName: Locator;
    readonly actionButton: Locator;
    readonly actionCancelButton: Locator;
    readonly reasonInput: Locator;
    readonly yesButton: Locator;
    readonly noButton: Locator;
    readonly actionSendButton: Locator;
    readonly logoutButton: Locator;
    readonly actionBrowserButton: Locator;
    readonly actionRefusedButton: Locator;
    readonly iconAction: Locator;
    readonly sendButton: Locator;
    readonly browseButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.browseButton = page.locator("//span[contains(normalize-space(),'Duyệt')]");
        this.sendButton = page.locator("//span[contains(normalize-space(),'Gửi')]");
        this.iconAction = page.locator("//tr[@id='row-0']//i[@class='mdi mdi-format-list-group mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']");
        this.debtButton = page.locator("//div[contains(text(),'Tạm ứng')]");

        this.addButton = page.locator("//span[normalize-space()='Thêm']");
        this.searchButton = page.locator("//span[normalize-space()='Tìm kiếm']");
        this.saveButton = page.locator("//span[normalize-space()='Lưu']");
        this.cancelButton = page.locator("//span[normalize-space()='Hủy']");
        this.requiredErrorNameMessage = page.getByText("Nhập chọn nhân viên");
        this.requiredErrorAmountMessage = page.getByText("Nhập số tiền");
        this.requiredErrorNoteMessage = page.getByText("Nhập ghi chú");
        this.requiredErrorReasonMessage = page.getByText("Nhập lý do");
        this.inputName = page.getByRole("textbox", {name: "Chọn nhân viên ※ Chọn nhân vi", });
        this.chosenName = page.getByText("BAT810-Nguyễn Văn Minh");
        this.inputAmount = page.locator("//div[2]/div/div[2]/div/div[2]/div/div/div/div[3]/input");
        this.inputNote = page.getByRole("textbox", { name: "Ghi chú ※ Ghi chú ※" });
        this.editButton = page.getByRole('button', { name: 'Sửa' });
        this.searchNameInput = page.getByRole('textbox', { name: 'Tên nhân viên Tên nhân viên' });
        this.chosesearchName = page.getByRole('option', { name: 'BAT810 - Nguyễn Văn Minh' });
        this.actionCancelButton = page.getByRole('button', { name: 'Hủy' });
        this.reasonInput = page.getByRole('textbox', { name: 'Lý do ※ Lý do ※' })
        this.yesButton = page.getByRole('button', { name: 'Có' });
        this.noButton = page.getByRole('button', { name: 'Không' });
        this.actionSendButton = page.getByRole('button', { name: 'Gửi' });
        this.logoutButton = page.locator("//span[normalize-space()='Đăng xuất']");
        this.actionBrowserButton = page.getByRole('button', { name: 'Duyệt' });
        this.actionRefusedButton = page.getByRole('button', { name: 'Từ chối' });
    }


    async clickBrowseButton() {
        await this.browseButton.click();
    }

    async clickIconAction() {
        await this.iconAction.click();
    }
    async clickSendButton() {
        await this.sendButton.click();
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async expectFillNameError() {
        await expect(this.requiredErrorNameMessage).toHaveText(
            "Nhập chọn nhân viên"
        );
    }
    
    async clickDebtButton() {
        await this.debtButton.click();
    }

    async expectFillNoteError() {
        await expect(this.requiredErrorNoteMessage).toHaveText("Nhập ghi chú");
    }

    async fillName(name: string) {
        await this.inputName.fill(name);
        await this.chosenName.click();
    }

    async fillAmount(amount: string) {
        await this.inputAmount.fill(amount);
    }

    async fillNote(note: string) {
        await this.inputNote.fill(note);
    }

    async clickEditButton() {
        await this.searchNameInput.fill('BAT810 - Nguyễn Văn Minh');
        await this.chosesearchName.click();
        await this.searchButton.click();
        await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for edit Admin Tạo mới', exact: true }).getByRole('button').click();
        await this.editButton.click();
    }

    async expectFillAmountError() {
        await expect(this.requiredErrorAmountMessage).toHaveText("Nhập số tiền");
    }

    async clickActionCancelButton() {
        await this.searchNameInput.fill('BAT810 - Nguyễn Văn Minh');
        await this.chosesearchName.click();
        await this.searchButton.click();
        await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for cancel Admin Tạo mới', exact: true }).getByRole('button').click();
        await this.actionCancelButton.click();
    }

    async fillReason(reason: string) {
        await this.reasonInput.fill(reason);
    }

    async clickYesButton() {
        await this.yesButton.click();
    }

    async clickActionSendButton() {
       
    }

    async expectFillReasonError() {
        await expect(this.requiredErrorReasonMessage).toHaveText("Nhập lý do");
    }

    async clickLogoutButton() {
        await this.logoutButton.click();
    }

    async clickActionBrowsedButton() {
        await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Đã gửi', exact: true }).getByRole('button').click();
        await this.actionBrowserButton.click();
    }

    async clickActionRefusedButton() {
        await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Đã gửi', exact: true }).getByRole('button').click();
        await this.actionRefusedButton.click();
    }

    async clickActionSendCancelButton() {
        await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Đã gửi', exact: true }).getByRole('button').click();
        await this.actionCancelButton.click();
    }
}