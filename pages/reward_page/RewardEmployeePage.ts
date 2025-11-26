import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class RewardEmployeePage extends BasePage {
    readonly REWARD_EMPLOYEE: Locator;
    readonly REWARD_NAME_INPUT: Locator;
    readonly CHOOSE_EMPLOYEE_INPUT: Locator;
    readonly SELECT_EMPLOYEE: Locator;
    readonly CHOOSE_REWARD_TYPE_INPUT: Locator;
    readonly SELECT_REWARD_TYPE: Locator;
    readonly MONEY_INPUT: Locator;
    readonly SELECT_WAITING_FOR_APPROVED: Locator;
    readonly VALIDATION_REWARD_NAME: Locator;
    readonly VALIDATION_EMPLOYEE: Locator;
    readonly VALIDATION_REWARD_TYPE: Locator;
    readonly VALIDATION_MONEY: Locator;
    readonly DAY_REWARD_INPUT: Locator;
    readonly DAY_19: Locator;
    readonly SEARCH_BY_REWARD_NAME: Locator;
    readonly SEARCH_BY_EMPLOYEE: Locator;
    readonly SEARCH_BY_REWARD_TYPE: Locator;
    readonly SEARCH_BY_DATE: Locator;
    readonly NEW_STATUS: Locator;
    readonly APPROVED_STATUS: Locator;
    readonly CANCELLED_STATUS: Locator;
    readonly VERIFY_SEARCH_BY_REWARD_NAME: Locator;
    readonly VERIFY_SEARCH_BY_EMPLOYEE: Locator;
    readonly VERIFY_SEARCH_BY_REWARD_TYPE: Locator;
    readonly VERIFY_SEARCH_BY_DATE: Locator;
    readonly VERIFY_NEW_STATUS: Locator;
    readonly VERIFY_APPROVED_STATUS: Locator;
    readonly VERIFY_CANCELLED_STATUS: Locator;
    readonly DAY_REWARD_ADD: Locator;

    constructor(page: Page) {
        super(page);
        this.REWARD_EMPLOYEE = page.locator("//div[contains(text(),'Khen thưởng nhân viên')]");
        this.REWARD_NAME_INPUT = page.getByRole('textbox', { name: 'Tên khen thưởng ※' });
        this.CHOOSE_EMPLOYEE_INPUT = page.getByRole('textbox', { name: 'Chọn nhân viên ※' });
        this.SELECT_EMPLOYEE = page.locator("//div[text()='BAT810 - Nguyễn Văn Minh']");
        this.CHOOSE_REWARD_TYPE_INPUT = page.getByRole('textbox', { name: 'Chọn loại khen thưởng ※' });
        this.SELECT_REWARD_TYPE = page.locator("//div[text()='Khen thưởng 2']");
        this.MONEY_INPUT = page.getByRole('textbox', { name: 'Tiền thưởng ※' });
        this.SELECT_WAITING_FOR_APPROVED = page.locator("//div[contains(text(),'Chờ duyệt')]");

        // VALIDATION
        this.VALIDATION_REWARD_NAME = page.locator("//div[contains(text(),'Nhập tên khen thưởng')]");
        this.VALIDATION_EMPLOYEE = page.locator("//div[contains(text(),'Nhập chọn nhân viên')]");
        this.VALIDATION_REWARD_TYPE = page.locator("//div[contains(text(),'Nhập chọn loại khen thưởng')]");
        this.VALIDATION_MONEY = page.locator("//div[contains(text(),'Nhập tiền thưởng')]");

        this.DAY_REWARD_INPUT = page.getByRole('textbox', { name: 'Ngày khen thưởng' });
        this.DAY_19 = page.locator("//div[contains(@class, 'dp__cell_inner') and normalize-space()='19']");
        this.DAY_REWARD_ADD = page.locator("//div[7]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.SEARCH_BY_REWARD_NAME = page.getByRole('textbox', { name: 'Tên khen thưởng' });
        this.SEARCH_BY_EMPLOYEE = page.getByRole('textbox', { name: 'Nhân viên được khen thưởng' });
        this.SEARCH_BY_REWARD_TYPE = page.getByRole('textbox', { name: 'Tên loại khen thưởng' });
        this.SEARCH_BY_DATE = page.getByRole('textbox', { name: 'Ngày khen thưởng' });
        this.NEW_STATUS = page.locator("//div[contains(text(),'Mới tạo')]");
        this.APPROVED_STATUS = page.locator("//div[contains(text(),'Đã duyệt')]");
        this.CANCELLED_STATUS = page.locator("//div[contains(text(),'Đã hủy')]");
        this.VERIFY_SEARCH_BY_REWARD_NAME = page.locator("//tr[@id='row-0']//span[contains(text(),'Reward Employee 4')]");
        this.VERIFY_SEARCH_BY_EMPLOYEE = page.locator("//tr[@id='row-0']//span[contains(text(),'BAT810 - Nguyễn Văn Minh')]");
        this.VERIFY_SEARCH_BY_REWARD_TYPE = page.locator("//tr[@id='row-0']//span[contains(text(),'Khen thưởng 2')]");
        this.VERIFY_SEARCH_BY_DATE = page.locator("//td[normalize-space()='19-06-2025']").first();
        this.VERIFY_NEW_STATUS = page.locator("//tr[@id='row-0']//div[text()='Mới tạo']");
        this.VERIFY_APPROVED_STATUS = page.locator("//tr[@id='row-0']//div[text()='Đã duyệt']");
        this.VERIFY_CANCELLED_STATUS = page.locator("//tr[@id='row-0']//div[text()='Đã hủy']");
    }


    async clickRewardEmployee() { await this.safeClick(this.REWARD_EMPLOYEE); }
    async fillRewardName(name: string) { await this.safeFill(this.REWARD_NAME_INPUT, name); }
    async fillChooseEmployee(name: string) { await this.safeFill(this.CHOOSE_EMPLOYEE_INPUT, name); }
    async clickSelectEmployee() { await this.safeClick(this.SELECT_EMPLOYEE); }
    async clickChooseRewardType() { await this.safeClick(this.CHOOSE_REWARD_TYPE_INPUT); }
    async clickSelectRewardType() { await this.safeClick(this.SELECT_REWARD_TYPE); }
    async fillMoney(money: string) { await this.safeFill(this.MONEY_INPUT, money); }
    async clearMoney() { await this.MONEY_INPUT.clear(); }
    async clickSelectWaitingForApproved() { await this.safeClick(this.SELECT_WAITING_FOR_APPROVED); }
    async clickApprovedStatus() { await this.safeClick(this.APPROVED_STATUS); }
    async clickCancelledStatus() { await this.safeClick(this.CANCELLED_STATUS); }
    async clickNewStatus() { await this.safeClick(this.NEW_STATUS); }
    async clickDayReward() { await this.safeClick(this.DAY_REWARD_INPUT); }
    async clickDay19() { await this.safeClick(this.DAY_19); }
    async clickDayRewardAdd() { await this.safeClick(this.DAY_REWARD_ADD); }
    async fillSearchByRewardName(search: string) { await this.safeFill(this.SEARCH_BY_REWARD_NAME, search); }
    async fillSearchByEmployee(search: string) { await this.safeFill(this.SEARCH_BY_EMPLOYEE, search); }
    async fillSearchByRewardType(search: string) { await this.safeFill(this.SEARCH_BY_REWARD_TYPE, search); }
    async clickSearchByDate() { await this.safeClick(this.SEARCH_BY_DATE); }

    async verifyRewardNameSearch(result: string) {
        const locator = this.page.locator(`(//tr[.//span[normalize-space(text())='${result}']]/td)[2]`);
        await this.safeVerifyToHaveText(locator, result);
    }

    async verifyEmployeeSearch(expected: string) {
         await this.safeVerifyToHaveText(this.VERIFY_SEARCH_BY_EMPLOYEE, expected);
         }

    async verifyRewardTypeSearch(expected: string) { await this.safeVerifyToHaveText(this.VERIFY_SEARCH_BY_REWARD_TYPE, expected); }

    async verifyDateSearch(expected: string) { await this.safeVerifyTextContains(this.VERIFY_SEARCH_BY_DATE, expected); }

    async verifyNewStatusSearch(expected: string) { await this.safeVerifyToHaveText(this.VERIFY_NEW_STATUS, expected); }

    async verifyApprovedStatusSearch(expected: string) { await this.safeVerifyToHaveText(this.VERIFY_APPROVED_STATUS, expected); }

    async verifyCancelledStatusSearch(expected: string) { await this.safeVerifyToHaveText(this.VERIFY_CANCELLED_STATUS, expected); }

    // VALIDATION
    async verifyValidationRewardName() { await this.safeVerifyToHaveText(this.VALIDATION_REWARD_NAME, 'Nhập tên khen thưởng'); }

    async verifyValidationEmployee() { await this.safeVerifyToHaveText(this.VALIDATION_EMPLOYEE, 'Nhập chọn nhân viên'); }

    async verifyValidationRewardType() { await this.safeVerifyToHaveText(this.VALIDATION_REWARD_TYPE, 'Nhập chọn loại khen thưởng'); }

    async verifyValidationMoney() { await this.safeVerifyToHaveText(this.VALIDATION_MONEY, 'Nhập tiền thưởng'); }

    async createReward() {
        await this.fillRewardName('Reward Employee');
        await this.fillChooseEmployee('Minh');
        await this.clickSelectEmployee();
        await this.clickChooseRewardType();
        await this.clickSelectRewardType();
        await this.fillMoney('1000000');
        await this.fillDescription('Description'); await this.fillNote('Note');
    }



}
