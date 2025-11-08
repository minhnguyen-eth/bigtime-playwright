import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class DebtPage extends BasePage {

    readonly debtButton: Locator;
    readonly searchNameInput: Locator;
    readonly chosesearchName: Locator;
    readonly requiredErrorNameMessage: Locator;
    readonly requiredErrorAmountMessage: Locator;
    readonly requiredErrorNoteMessage: Locator;
    readonly inputName: Locator;
    readonly inputAmount: Locator;
    readonly chosenName: Locator;
    readonly selectEmployee: Locator;
    readonly textBoxSearchDepartment: Locator;
    readonly paymentMethodCombobox: Locator;
    readonly cardMethod: Locator;
    readonly bankMethod: Locator;
    readonly cashMethod: Locator;

    constructor(page: Page) {
        super(page);
        this.cardMethod = page.getByText('Thẻ');
        this.bankMethod = page.getByText('Chuyển khoản');
        this.cashMethod = page.getByText('Tiền mặt');
        this.paymentMethodCombobox = page.getByRole('combobox').filter({ hasText: 'Phương thức thanh toán ※' }).locator('i')
        this.textBoxSearchDepartment = page.getByRole('textbox', { name: 'Tên bộ phận' });
        this.selectEmployee = page.locator("//div[@class='v-list-item__content']//span[contains(text(), 'Nguyễn Văn Minh')]");
        this.debtButton = page.locator("//div[contains(text(),'Tạm ứng')]");
        this.requiredErrorNameMessage = page.getByText("Nhập chọn nhân viên");
        this.requiredErrorAmountMessage = page.getByText("Nhập số tiền");
        this.requiredErrorNoteMessage = page.getByText("Nhập ghi chú");
        this.inputName = page.locator("//div[2]/div/div[1]/div/div/div/div[3]/div/input");
        this.chosenName = page.getByText("BAT810-Nguyễn Văn Minh");
        this.inputAmount =  page.getByRole('textbox', { name: 'Số tiền ※' });
        this.searchNameInput = page.getByRole('textbox', { name: 'Tên nhân viên Tên nhân viên' });
        this.chosesearchName = page.getByRole('option', { name: 'BAT810 - Nguyễn Văn Minh' });

    }

    async clickPaymentMethodCombobox() {
        await this.safeClick(this.paymentMethodCombobox);
    }

    async clickCardMethod() {
        await this.safeClick(this.cardMethod);
    }

    async clickBankMethod() {
        await this.safeClick(this.bankMethod);
    }

    async clickCashMethod() {
        await this.safeClick(this.cashMethod);
    }

    async fillSearchByDepartment(department: string) {
        await this.safeFill(this.textBoxSearchDepartment, department);
    }

    async clickSelectEmployee() {
        await this.safeClick(this.selectEmployee);
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

    async clickEditButton() {
        await this.safeFill(this.searchNameInput, 'BAT810 - Nguyễn Văn Minh');
        await this.safeClick(this.selectEmployee);
        await this.safeClick(this.searchButton);
        await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for edit Admin Tạo mới', exact: true }).getByRole('button').click();
        await this.clickEdit();
    }

    async expectFillAmountError() {
        await this.safeVerifyToHaveText(this.requiredErrorAmountMessage, "Nhập số tiền");
    }

    async clickActionCancelButton() {
        await this.safeFill(this.searchNameInput, 'BAT810 - Nguyễn Văn Minh');
        await this.safeClick(this.selectEmployee);
        await this.safeClick(this.searchButton);
        await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for cancel Admin Tạo mới', exact: true }).getByRole('button').click();
        await this.clickCancel();
    }

    async clickActionBrowsedButton() {
        await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Đã gửi', exact: true }).getByRole('button').click();
        await this.clickCancel();

    }

    async clickActionSendCancelButton() {
        await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Đã gửi', exact: true }).getByRole('button').click();
        await this.clickCancel();
    }
}
