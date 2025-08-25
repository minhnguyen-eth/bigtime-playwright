import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class RewardEmployeePage extends BasePage {
    readonly rewardEmployee: Locator;
    readonly rewardNameInput: Locator;
    readonly chosseEmployeeInput: Locator;
    readonly selectEmployee: Locator;
    readonly chosseRewardType: Locator;
    readonly selectRewardType: Locator;
    readonly moneyInput: Locator;
    readonly seclectWaitingForApproved: Locator;
    readonly validationRewardName: Locator;
    readonly validationEmployee: Locator;
    readonly validationRewardType: Locator;
    readonly validationMoney: Locator;
    readonly dayReward: Locator;
    readonly day19: Locator;
    readonly searchByRewardName: Locator;
    readonly searchByEmployee: Locator;
    readonly searchByRewardType: Locator;
    readonly searchByDate: Locator;
    readonly newStatus: Locator;
    readonly approvedStatus: Locator;
    readonly cancelledStatus: Locator;
    readonly verifySearchByRewardName: Locator;
    readonly verifySearchByEmployee: Locator;
    readonly verifySearchByRewardType: Locator;
    readonly verifySearchByDate: Locator;
    readonly verifyNewStatus: Locator;
    readonly verifyApprovedStatus: Locator;
    readonly verifyCancelledStatus: Locator;
    readonly dayRewardAdd: Locator;
    readonly selectApproved: Locator;
    readonly monthButton: Locator;
    readonly month06Button: Locator;
   
    constructor(page: Page) {
        super(page);
        this.dayRewardAdd = page.locator("//div[7]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.verifyCancelledStatus = page.locator("//tr[@id='row-0']//div[text()='Đã hủy']");
        this.verifyApprovedStatus = page.locator("//tr[@id='row-0']//div[text()='Đã duyệt']");
        this.verifyNewStatus = page.locator("//tr[@id='row-0']//div[text()='Mới tạo']");
        this.verifySearchByDate = page.locator("//td[normalize-space()='19-06-2025']").first();
        this.verifySearchByRewardType = page.locator("//tr[@id='row-0']//span[contains(text(),'Khen thưởng 2')]");
        this.verifySearchByEmployee = page.locator("//tr[@id='row-0']//span[contains(text(),'BAT810 - Nguyễn Văn Minh')]");
        this.verifySearchByRewardName = page.locator("//tr[@id='row-0']//span[contains(text(),'Reward Employee 4')]");
        this.approvedStatus = page.locator("//div[contains(text(),'Đã duyệt')]");
        this.cancelledStatus = page.locator("//div[contains(text(),'Đã hủy')]");
        this.newStatus = page.locator("//div[contains(text(),'Mới tạo')]");
        this.searchByDate = page.getByRole('textbox', { name: 'Ngày khen thưởng' });
        this.searchByRewardType = page.getByRole('textbox', { name: 'Tên loại khen thưởng' });
        this.searchByEmployee = page.getByRole('textbox', { name: 'Nhân viên được khen thưởng' });
        this.searchByRewardName = page.getByRole('textbox', { name: 'Tên khen thưởng' });
        this.day19 = page.locator("//div[contains(@class, 'dp__cell_inner') and normalize-space()='19']");
        this.dayReward = page.getByRole('textbox', { name: 'Ngày khen thưởng' });
        this.validationMoney = page.locator("//div[contains(text(),'Nhập tiền thưởng')]");
        this.validationRewardType = page.locator("//div[contains(text(),'Nhập chọn loại khen thưởng')]");
        this.validationEmployee = page.locator("//div[contains(text(),'Nhập chọn nhân viên')]");
        this.validationRewardName = page.locator("//div[contains(text(),'Nhập tên khen thưởng')]");
        this.seclectWaitingForApproved = page.locator("//div[contains(text(),'Chờ duyệt')]");
        this.selectApproved = page.locator("//div[contains(text(),'Đã duyệt')]");
        this.moneyInput = page.getByRole('textbox', { name: 'Tiền thưởng ※' });
        this.selectRewardType = page.locator("//div[text()='Khen thưởng 2']");
        this.chosseRewardType = page.getByRole('textbox', { name: 'Chọn loại khen thưởng ※' });
        this.selectEmployee = page.locator("//span[@class='v-autocomplete__unmask'][contains(text(),'BAT810 - Nguyễn Văn')]");
        this.chosseEmployeeInput = page.getByRole('textbox', { name: 'Chọn nhân viên ※' });
        this.rewardNameInput = page.getByRole('textbox', { name: 'Tên khen thưởng ※' });
        this.rewardEmployee = page.locator("//div[contains(text(),'Khen thưởng nhân viên')]");
        this.month06Button = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='Thg 6']");
        this.monthButton = page.locator("button[aria-label='Open months overlay']");
    }

    async clickMonth06Button() {
        await this.safeClick(this.month06Button);
    }

    async clickMonthButton() {
        await this.safeClick(this.monthButton);
    }

    async clickSelectApproved() {
        await this.safeClick(this.selectApproved);
    }

    async clickDayRewardAdd() {
        await this.safeClick(this.dayRewardAdd);
    }

    async clickApprovedStatus() {
        await this.safeClick(this.approvedStatus);
    }

    async clickCancelledStatus() {
        await this.safeClick(this.cancelledStatus);
    }

    async clickNewStatus() {
        await this.safeClick(this.newStatus);
    }

    async verifySearchByRewardNameSearch() {
        await this.safeVerifyToHaveText(this.verifySearchByRewardName, 'Reward Employee 4');
    }

    async verifySearchByEmployeeSearch() {
        await this.safeVerifyToHaveText(this.verifySearchByEmployee, 'BAT810 - Nguyễn Văn Minh');
    }

    async verifySearchByRewardTypeSearch() {
        await this.safeVerifyToHaveText(this.verifySearchByRewardType, 'Khen thưởng 2');
    }

    async verifySearchByDateSearch() {
        await this.safeVerifyToHaveText(this.verifySearchByDate, '19-06-2025');
    }
    async verifyCancelledStatusSearch() {
        await this.safeVerifyToHaveText(this.verifyCancelledStatus, 'Đã hủy');
    }

    async verifyApprovedStatusSearch() {
        await this.safeVerifyToHaveText(this.verifyApprovedStatus, 'Đã duyệt');
    }

    async verifyNewStatusSearch() {
        await this.safeVerifyToHaveText(this.verifyNewStatus, 'Mới tạo');
    }

    async fillSearchByRewardName(searchByRewardName: string) {
        await this.safeFill(this.searchByRewardName, searchByRewardName);
    }

    async fillSearchByEmployee(searchByEmployee: string) {
        await this.safeFill(this.searchByEmployee, searchByEmployee);
    }

    async fillSearchByRewardType(searchByRewardType: string) {
        await this.safeFill(this.searchByRewardType, searchByRewardType);
    }

    async clickSearchByDate() {
        await this.safeClick(this.searchByDate);
    }

    async clickDay19() {
        await this.safeClick(this.day19);
    }

    async clickDayReward() {
        await this.safeClick(this.dayReward);
    }

    async validateValidationMoney() {
        await this.safeVerifyToHaveText(this.validationMoney, 'Nhập tiền thưởng');
    }

    async validateValidationRewardType() {
        await this.safeVerifyToHaveText(this.validationRewardType, 'Nhập chọn loại khen thưởng');
    }

    async validateValidationEmployee() {
        await this.safeVerifyToHaveText(this.validationEmployee, 'Nhập chọn nhân viên');
    }

    async validateValidationRewardName() {
        await this.safeVerifyToHaveText(this.validationRewardName, 'Nhập tên khen thưởng');
    }

    async clickSeclectWaitingForApproved() {
        await this.safeClick(this.seclectWaitingForApproved);
    }


    async fillMoneyInput(money: string) {
        await this.safeFill(this.moneyInput, money);
    }

    async clearMoneyInput() {
        await this.moneyInput.clear();
    }

    async clickSelectRewardType() {
        await this.safeClick(this.selectRewardType);
    }

    async clickChosseRewardType() {
        await this.safeClick(this.chosseRewardType);
    }

    async clickSelectEmployee() {
        await this.safeClick(this.selectEmployee);
    }

    async fillChosseEmployee(chosseEmployee: string) {
        await this.safeFill(this.chosseEmployeeInput, chosseEmployee);
    }

    async fillRewardName(rewardName: string) {
        await this.safeFill(this.rewardNameInput, rewardName);
    }

    async clickRewardEmployee() {
        await this.safeClick(this.rewardEmployee);
    }

    async CreateReward() {
        await this.fillRewardName('Reward Employee');
        await this.fillChosseEmployee('Minh');
        await this.clickSelectEmployee();
        await this.clickChosseRewardType();
        await this.clickSelectRewardType();
        await this.fillMoneyInput('1000000');
        await this.fillDescription('Description');
        await this.fillNote('Note');

    }

}
