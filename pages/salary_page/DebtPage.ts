import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../BasePage";
export class DebtPage extends BasePage {

    readonly debtButton: Locator;
    readonly addButton: Locator;
    readonly editButton: Locator;
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
    readonly sendButton: Locator;
    readonly browseButton: Locator;
    readonly selectEmployee: Locator;

    constructor(page: Page) {
        super(page);
        this.selectEmployee = page.locator("//div[@class='v-list-item__content']//span[contains(text(), 'Nguyễn Văn Minh')]");
        this.browseButton = page.locator("//span[contains(normalize-space(),'Duyệt')]");
        this.sendButton = page.locator("//span[contains(normalize-space(),'Gửi')]");
        this.debtButton = page.locator("//div[contains(text(),'Tạm ứng')]");
        this.addButton = page.locator("//span[normalize-space()='Thêm']");
        this.searchButton = page.locator("//span[normalize-space()='Tìm kiếm']");
        this.saveButton = page.locator("//span[normalize-space()='Lưu']");
        this.cancelButton = page.locator("//span[normalize-space()='Hủy']");
        this.requiredErrorNameMessage = page.getByText("Nhập chọn nhân viên");
        this.requiredErrorAmountMessage = page.getByText("Nhập số tiền");
        this.requiredErrorNoteMessage = page.getByText("Nhập ghi chú");
        this.requiredErrorReasonMessage = page.getByText("Nhập lý do");
        this.inputName = page.locator("//div[2]/div/div[1]/div/div/div/div[3]/div/input");
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

    async clickSelectEmployee() {
        await this.safeClick(this.selectEmployee);
    }

    async clickBrowseButton() {
        await this.safeClick(this.browseButton);
    }

    async clickSendButton() {
        await this.safeClick(this.sendButton);
    }

    async clickCancelButton() {
        await this.safeClick(this.cancelButton);
    }

    async expectFillNameError() {
        await this.safeVerifyToHaveText(this.requiredErrorNameMessage, "Nhập chọn nhân viên");
    }

    async clickDebtButton() {
        await this.safeClick(this.debtButton);
    }

    async expectFillNoteError() {
        await this.safeVerifyToHaveText(this.requiredErrorNoteMessage, "Nhập ghi chú");
    }

    async fillName(name: string) {
        await this.safeFill(this.inputName, name);
        await this.safeClick(this.selectEmployee);
    }

    async fillAmount(amount: string) {
        await this.safeFill(this.inputAmount, amount);
    }

    async fillNote(note: string) {
        await this.safeFill(this.inputNote, note);
    }

    async clickEditButton() {
        await this.safeFill(this.searchNameInput, 'BAT810 - Nguyễn Văn Minh');
        await this.safeClick(this.selectEmployee);
        await this.safeClick(this.searchButton);
        await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for edit Admin Tạo mới', exact: true }).getByRole('button').click();
        await this.safeClick(this.editButton);
    }

    async expectFillAmountError() {
        await this.safeVerifyToHaveText(this.requiredErrorAmountMessage, "Nhập số tiền");
    }

    async clickActionCancelButton() {
        await this.safeFill(this.searchNameInput, 'BAT810 - Nguyễn Văn Minh');
        await this.safeClick(this.selectEmployee);
        await this.safeClick(this.searchButton);
        await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for cancel Admin Tạo mới', exact: true }).getByRole('button').click();
        await this.safeClick(this.actionCancelButton);
    }

    async fillReason(reason: string) {
        await this.safeFill(this.reasonInput, reason);
    }

    async clickYesButton() {
        await this.safeClick(this.yesButton);
    }

    async clickActionSendButton() {
        await this.safeClick(this.actionSendButton);
    }

    async expectFillReasonError() {
        await this.safeVerifyToHaveText(this.requiredErrorReasonMessage, "Nhập lý do");
    }

    async clickActionBrowsedButton() {
        await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Đã gửi', exact: true }).getByRole('button').click();
        await this.safeClick(this.actionBrowserButton);

    }

    async clickActionRefusedButton() {
        await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Đã gửi', exact: true }).getByRole('button').click();
        await this.safeClick(this.actionRefusedButton);
    }

    async clickActionSendCancelButton() {
        await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Đã gửi', exact: true }).getByRole('button').click();
        await this.safeClick(this.actionCancelButton);
    }
}