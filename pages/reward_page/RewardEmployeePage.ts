import { expect, Locator, Page } from "@playwright/test";


export class RewardEmployeePage {

    readonly page: Page;
    readonly rewardEmployee: Locator;
    readonly rewardNameInput: Locator;
    readonly chosseEmployeeInput: Locator;
    readonly selectEmployee: Locator;
    readonly chosseRewardType: Locator;
    readonly selectRewardType: Locator;
    readonly moneyInput: Locator;
    readonly descriptionInput: Locator;
    readonly noteInput: Locator;
    readonly statusDropdownAdd: Locator;
    readonly seclectWaitingForApproved: Locator;
    readonly validationRewardName: Locator;
    readonly validationEmployee: Locator;
    readonly validationRewardType: Locator;
    readonly validationMoney: Locator;
    readonly dayReward: Locator;
    readonly day19: Locator;
    readonly chosseButton: Locator;
    readonly searchByRewardName: Locator;
    readonly searchByEmployee: Locator;
    readonly searchByRewardType: Locator;
    readonly searchByDate: Locator;
    readonly statusDropdownSearch: Locator;
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
    readonly row0: Locator;
    readonly reasonInput: Locator;
    readonly dayRewardAdd: Locator;
    readonly yesButton: Locator;
    readonly selectApproved: Locator;
    readonly monthButton: Locator;
    readonly month06Button: Locator;




    constructor(page: Page) {
        this.page = page;
        this.yesButton = page.locator("//span[normalize-space()='Có']");
        this.dayRewardAdd = page.locator("//div[7]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.reasonInput = page.locator("//form/div/div[3]/div/div/div/div/div/div[3]/textarea");
        this.row0 = page.locator("//tr[@id='row-0']");
        this.verifyCancelledStatus = page.locator("//tr[@id='row-0']//div[text()='Đã hủy']");
        this.verifyApprovedStatus = page.locator("//tr[@id='row-0']//div[text()='Đã duyệt']");
        this.verifyNewStatus = page.locator("//tr[@id='row-0']//div[@class='v-chip__content']");
        this.verifySearchByDate = page.locator("//td[normalize-space()='19-06-2025']");
        this.verifySearchByRewardType = page.locator("//tr[@id='row-0']//span[contains(text(),'Khen thưởng 2')]");
        this.verifySearchByEmployee = page.locator("//tr[@id='row-0']//span[contains(text(),'BAT810 - Nguyễn Văn Minh')]");
        this.verifySearchByRewardName = page.locator("//tr[@id='row-0']//span[contains(text(),'Reward Employee 4')]");
        this.approvedStatus = page.locator("//div[contains(text(),'Đã duyệt')]");
        this.cancelledStatus = page.locator("//div[contains(text(),'Đã hủy')]");
        this.newStatus = page.locator("//div[contains(text(),'Mới tạo')]");
        this.searchByDate = page.locator("//form/div/div[4]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.searchByRewardType = page.locator("//form/div/div[3]/div/div/div/div[3]/div/input");
        this.statusDropdownSearch = page.locator("//div[@class='v-field v-field--appended v-field--center-affix v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//div[@class='v-field__input']");
        this.searchByEmployee = page.locator("//form/div/div[2]/div/div/div/div[3]/div/input");
        this.searchByRewardName = page.locator("//form/div/div[1]/div/div/div/div[3]/div/input");
        this.chosseButton = page.locator("//button[contains(text(),'Chọn')]");
        this.day19 = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='19']");
        this.dayReward = page.locator("//form/div/div[4]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.validationMoney = page.locator("//div[contains(text(),'Nhập tiền thưởng')]");
        this.validationRewardType = page.locator("//div[contains(text(),'Nhập chọn loại khen thưởng')]");
        this.validationEmployee = page.locator("//div[contains(text(),'Nhập chọn nhân viên')]");
        this.validationRewardName = page.locator("//div[contains(text(),'Nhập tên khen thưởng')]");
        this.seclectWaitingForApproved = page.locator("//div[contains(text(),'Chờ duyệt')]");
        this.selectApproved = page.locator("//div[contains(text(),'Đã duyệt')]");
        this.statusDropdownAdd = page.locator("//div[@class='v-input v-input--horizontal v-input--center-affix v-input--density-compact v-theme--lightColor7 v-locale--is-ltr v-input--dirty v-text-field v-select v-select--single v-select--selected custom-select']//div[@class='v-field__input']");
        this.noteInput = page.locator("//div[2]/div/div[6]/div/div/div/div[3]/textarea");
        this.descriptionInput = page.locator("//div[2]/div/div[5]/div/div/div/div[3]/textarea");
        this.moneyInput = page.locator("//div[2]/div/div[4]/div/div/div/div[3]/input");
        this.selectRewardType = page.locator("//div[text()='Khen thưởng 2']");
        this.chosseRewardType = page.locator("//div[2]/div/div[3]/div/div/div/div[3]/div/input");
        this.selectEmployee = page.locator("//span[@class='v-autocomplete__unmask'][contains(text(),'BAT810 - Nguyễn Văn')]");
        this.chosseEmployeeInput = page.locator("//div[2]/div/div[2]/div/div/div/div[3]/div/input");
        this.rewardNameInput = page.locator("//div[2]/div/div[1]/div/div/div/div[3]/div/input");
        this.rewardEmployee = page.locator("//div[contains(text(),'Khen thưởng nhân viên')]");
        this.month06Button = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='Thg 6']");
        this.monthButton = page.locator("button[aria-label='Open months overlay']");
    }

    async clickMonth06Button() {
        await this.month06Button.click();
    }

    async clickMonthButton() {
        await this.monthButton.click();
    }

    async clickSelectApproved() {
        await this.selectApproved.click();
    }

    async clickDayRewardAdd() {
        await this.dayRewardAdd.click();
    }

    async fillReasonInput(reasonInput: string) {
        await this.reasonInput.fill(reasonInput);
        await this.yesButton.click();
    }

    async clickYesButton() {
        await this.yesButton.click();
    }

    async clickRow0() {
        await this.row0.click();
    }

    async clickApprovedStatus() {
        await this.approvedStatus.click();
    }
    async clickCancelledStatus() {
        await this.cancelledStatus.click();
    }
    async clickNewStatus() {
        await this.newStatus.click();
    }

    async clickStatusDropdownSearch() {
        await this.statusDropdownSearch.click();
    }

    async verifySearchByRewardNameSearch() {
        await expect(this.verifySearchByRewardName).toBeVisible();
        await expect(this.verifySearchByRewardName).toHaveText('Reward Employee 4');
    }

    async verifySearchByEmployeeSearch() {
        await expect(this.verifySearchByEmployee).toBeVisible();
        await expect(this.verifySearchByEmployee).toHaveText('BAT810 - Nguyễn Văn Minh');
    }

    async verifySearchByRewardTypeSearch() {
        await expect(this.verifySearchByRewardType).toBeVisible();
        await expect(this.verifySearchByRewardType).toHaveText('Khen thưởng 2');
    }

    async verifySearchByDateSearch() {
        await expect(this.verifySearchByDate).toBeVisible();
        await expect(this.verifySearchByDate).toHaveText('19-06-2025');
    }

    async verifyCancelledStatusSearch() {
        await expect(this.verifyCancelledStatus).toBeVisible();
        await expect(this.verifyCancelledStatus).toHaveText('Đã hủy');
    }

    async verifyApprovedStatusSearch() {
        await expect(this.verifyApprovedStatus).toBeVisible();
        await expect(this.verifyApprovedStatus).toHaveText('Đã duyệt');
    }

    async verifyNewStatusSearch() {
        await expect(this.verifyNewStatus).toBeVisible();
    }

    async fillSearchByRewardName(searchByRewardName: string) {
        await this.searchByRewardName.fill(searchByRewardName);
    }

    async fillSearchByEmployee(searchByEmployee: string) {
        await this.searchByEmployee.fill(searchByEmployee);
    }

    async fillSearchByRewardType(searchByRewardType: string) {
        await this.searchByRewardType.fill(searchByRewardType);
    }

    async clickSearchByDate() {
        await this.searchByDate.click();
    }

    async clickChosseButton() {
        await this.chosseButton.click();
    }

    async clickDay19() {
        await this.day19.click();
    }

    async clickDayReward() {
        await this.dayReward.click();
    }

    async validateValidationMoney() {
        await expect(this.validationMoney).toBeVisible();
        await expect(this.validationMoney).toHaveText('Nhập tiền thưởng');
    }

    async validateValidationRewardType() {
        await expect(this.validationRewardType).toBeVisible();
        await expect(this.validationRewardType).toHaveText('Nhập chọn loại khen thưởng');
    }

    async validateValidationEmployee() {
        await expect(this.validationEmployee).toBeVisible();
        await expect(this.validationEmployee).toHaveText('Nhập chọn nhân viên');
    }

    async validateValidationRewardName() {
        await expect(this.validationRewardName).toBeVisible();
        await expect(this.validationRewardName).toHaveText('Nhập tên khen thưởng');
    }

    async clickSeclectWaitingForApproved() {
        await this.seclectWaitingForApproved.click();
    }

    async clickStatusDropdownAdd() {
        await this.statusDropdownAdd.click();
    }


    async fillNoteInput(note: string) {
        await this.noteInput.fill(note);
    }

    async fillDescriptionInput(description: string) {
        await this.descriptionInput.fill(description);
    }

    async fillMoneyInput(money: string) {
        await this.moneyInput.fill(money);
    }

    async clearMoneyInput() {
        await this.moneyInput.clear();
    }

    async clickSelectRewardType() {
        await this.selectRewardType.click();
    }

    async clickChosseRewardType() {
        await this.chosseRewardType.click();
    }

    async clickSelectEmployee() {
        await this.selectEmployee.click();
    }

    async fillChosseEmployee(chosseEmployee: string) {
        await this.chosseEmployeeInput.fill(chosseEmployee);
    }

    async fillRewardName(rewardName: string) {
        await this.rewardNameInput.fill(rewardName);
    }

    async clickRewardEmployee() {
        await this.rewardEmployee.click();
    }

    async CreateReward() {
        await this.fillRewardName('Reward Employee');
        await this.fillChosseEmployee('Minh');
        await this.clickSelectEmployee();
        await this.clickChosseRewardType();
        await this.clickSelectRewardType();
        await this.fillMoneyInput('1000000');
        await this.fillDescriptionInput('Description');
        await this.fillNoteInput('Note');

    }

}
