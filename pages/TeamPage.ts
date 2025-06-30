import { expect, Page, Locator } from "@playwright/test";

export class TeamPage {
  readonly page: Page;
  readonly teamButton: Locator;
  readonly teamNameInput: Locator;
  readonly teamCodeInput: Locator;
  readonly dropdownDepartment: Locator;
  readonly selectDepartment: Locator;
  readonly noteTextarea: Locator;
  readonly validationName: Locator;
  readonly validationCode: Locator;
  readonly validationDepartment: Locator;
  readonly inputSerchByName: Locator;
  readonly inputSearchByCode: Locator;
  readonly dropdownStatusSearch: Locator;
  readonly activityStatus: Locator;
  readonly lockStatus: Locator;
  readonly verifyActivityStatus: Locator;
  readonly verifyLockStatus: Locator;
  readonly dropdownStatusFormAdd: Locator;
  readonly validateCodeExist: Locator;
  readonly validateNameExist: Locator;
  readonly resultSearchByName: Locator;
  readonly resultSearchByCode: Locator;
  readonly resultMaxlenghtName: Locator;
  readonly resultMaxlenghtCode: Locator;

  constructor(page: Page) {
    this.page = page;

    this.resultMaxlenghtName = page.locator("//div[contains(text(),'Không nhập quá 255 kí tự.')]");
    this.resultMaxlenghtCode = page.locator("//div[contains(text(),'Không nhập quá 100 kí tự.')]");
    this.resultSearchByCode = page.locator("//tr[@id='row-0']//span[contains(text(),'T001')]");
    this.resultSearchByName = page.locator("//tr[@id='row-0']//span[contains(text(),'Nhóm It1')]");
    this.validateNameExist = page.locator("//li[contains(text(),'Tên đã tồn tại.')]");
    this.validateCodeExist = page.locator("//li[contains(text(),'Mã nhóm đã tồn tại')]");
    this.dropdownStatusFormAdd = page.locator("//div[@class='v-field v-field--active v-field--appended v-field--center-affix v-field--dirty v-field--prepended v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//i[@class='mdi-menu-down mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default v-select__menu-icon']");
    this.verifyLockStatus = page.locator("//tr[@id='row-0']//span[@class='custom-size'][normalize-space()='Khóa']");
    this.verifyActivityStatus = page.locator("//tr[@id='row-0']//span[@class='custom-size'][contains(text(),'Hoạt động')]");
    this.lockStatus = page.locator("//div[contains(text(),'Khóa')]");
    this.activityStatus = page.locator("//div[contains(text(),'Hoạt động')]");
    this.dropdownStatusSearch = page.locator("//div[@class='v-field v-field--appended v-field--center-affix v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//i[@class='mdi-menu-down mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default v-select__menu-icon']");
    this.inputSearchByCode = page.locator("//form/div/div[2]/div/div/div/div[3]/div/input");
    this.inputSerchByName = page.locator("//form/div/div[1]/div/div/div/div[3]/div/input");
    this.validationName = page.locator("//div[contains(text(),'Nhập tên nhóm')]");
    this.validationCode = page.locator("//div[contains(text(),'Nhập mã nhóm')]");
    this.validationDepartment = page.locator("//div[contains(text(),'Nhập thuộc bộ phận')]");
    this.selectDepartment = page.locator("//div[text()='Bộ phận Marketing']");
    this.noteTextarea = page.locator("//div[7]/div/div/div/div[3]/textarea");
    this.dropdownDepartment = page.locator("//i[@title='Open']");
    this.teamCodeInput = page.locator("//div[2]/div/div[3]/div/div/div/div[3]/div/input");
    this.teamNameInput = page.locator("//div[2]/div/div[2]/div/div/div/div[3]/div/input");
    this.teamButton = page.locator("//div[contains(text(),'Nhóm')]");


  }

  async getResultMaxlenghtName() {
    await expect(this.resultMaxlenghtName).toBeVisible();
    await expect(this.resultMaxlenghtName).toHaveText('Không nhập quá 255 kí tự.');
  }

  async getResultMaxlenghtCode() {
    await expect(this.resultMaxlenghtCode).toBeVisible();
    await expect(this.resultMaxlenghtCode).toHaveText('Không nhập quá 100 kí tự.');

  }

  async clickDropdownFormAdd() {
    await this.dropdownStatusFormAdd.click();
  }

  async getResultSearchByName() {
    await expect(this.resultSearchByName).toBeVisible();
    await expect(this.resultSearchByName).toHaveText('Nhóm It1');
  }

  async getResultSearchByCode() {
    await expect(this.resultSearchByCode).toBeVisible();
    await expect(this.resultSearchByCode).toHaveText('T001');
  }

  async getValidateNameExist() {
    await expect(this.validateNameExist).toBeVisible();
    await expect(this.validateNameExist).toHaveText('Tên đã tồn tại.');
  }

  async getValidateCodeExist() {
    await expect(this.validateCodeExist).toBeVisible();
    await expect(this.validateCodeExist).toHaveText('Mã nhóm đã tồn tại');
  }

  async getVerifyLockStatus() {
    await expect(this.verifyLockStatus).toBeVisible();
    await expect(this.verifyLockStatus).toHaveText('Khóa');
  }

  async getVerifyActivityStatus() {
    await expect(this.verifyActivityStatus).toBeVisible();
    await expect(this.verifyActivityStatus).toHaveText('Hoạt động');
  }

  async clickLockStatus() {
    await this.lockStatus.click();
  }

  async clickActivityStatus() {
    await this.activityStatus.click();
  }

  async clickDropdownStatusSearch() {
    await this.dropdownStatusSearch.click();
  }

  async searchByTeamCode(code: string) {
    await this.inputSearchByCode.fill(code);
  }

  async searchByTeamName(name: string) {
    await this.inputSerchByName.fill(name);
  }

  async validateRequiredFields() {
    await expect(this.validationName).toBeVisible();
    await expect(this.validationName).toHaveText('Nhập tên nhóm');

    await expect(this.validationCode).toBeVisible();
    await expect(this.validationCode).toHaveText('Nhập mã nhóm');

    await expect(this.validationDepartment).toBeVisible();
    await expect(this.validationDepartment).toHaveText('Nhập thuộc bộ phận');
  }

  async fillTeamName(teamname: string) {
    await this.teamNameInput.click();
    await this.teamNameInput.clear();
    await this.teamNameInput.fill(teamname);
  }

  async fillTeamCode(teamcode: string) {
    await this.teamCodeInput.clear();
    await this.teamCodeInput.fill(teamcode);
  }

  async clickSelectDepartment() {
    await this.dropdownDepartment.click();
    await this.selectDepartment.click();
  }

  async fillNote(note: string) {
    await this.noteTextarea.fill(note);
  }

  async clickTeamButton() {
    await this.teamButton.click();
  }

}