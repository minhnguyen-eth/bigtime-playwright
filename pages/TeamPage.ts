import { expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TeamPage extends BasePage {
  readonly teamButton: Locator;
  readonly teamNameInput: Locator;
  readonly teamCodeInput: Locator;
  readonly dropdownDepartment: Locator;
  readonly selectDepartment: Locator;
  readonly validationName: Locator;
  readonly validationCode: Locator;
  readonly validationDepartment: Locator;
  readonly inputSerchByName: Locator;
  readonly inputSearchByCode: Locator;
  readonly validateCodeExist: Locator;
  readonly validateNameExist: Locator;
  readonly resultSearchByName: Locator;
  readonly resultSearchByCode: Locator;

  constructor(page: Page) {
    super(page);
    this.resultSearchByCode = page.locator("//tr[@id='row-0']//span[contains(text(),'T001')]");
    this.resultSearchByName = page.locator("//tr[@id='row-0']//span[contains(text(),'Nhóm It1')]");
    this.validateNameExist = page.locator("//li[contains(text(),'Tên đã tồn tại.')]");
    this.validateCodeExist = page.locator("//li[contains(text(),'Mã đã tồn tại.')]");
    this.inputSearchByCode = page.getByRole('textbox', { name: 'Mã nhóm' })
    this.inputSerchByName = page.getByRole('textbox', { name: 'Tên nhóm' })
    this.validationName = page.locator("//div[contains(text(),'Nhập tên nhóm')]");
    this.validationCode = page.locator("//div[contains(text(),'Nhập mã nhóm')]");
    this.validationDepartment = page.locator("//div[contains(text(),'Nhập thuộc bộ phận')]");
    this.selectDepartment = page.locator("//div[text()='Bộ phận Marketing']");
    this.dropdownDepartment = page.locator("//i[@title='Open']");
    this.teamCodeInput = page.getByRole('textbox', { name: 'Mã nhóm ※' });
    this.teamNameInput =  page.getByRole('textbox', { name: 'Tên nhóm ※' });
    this.teamButton = page.locator("//div[contains(text(),'Nhóm')]");
  }

  async getResultSearchByName() {
    await this.safeVerifyToHaveText(this.resultSearchByName, 'Nhóm It1');
  }

  async getResultSearchByCode() {
    await this.safeVerifyToHaveText(this.resultSearchByCode, 'T001');
  }

  async getValidateCodeExist() {
    await this.safeVerifyToHaveText(this.validateCodeExist, 'Mã đã tồn tại.');
  }

  async searchByTeamCode(code: string) {
    await this.safeFill(this.inputSearchByCode, code);
  }

  async searchByTeamName(name: string) {
    await this.safeFill(this.inputSerchByName, name);
  }

  async validateRequiredFields() {
    await this.safeVerifyToHaveText(this.validationName, 'Nhập tên nhóm');
    await this.safeVerifyToHaveText(this.validationCode, 'Nhập mã nhóm');
    await this.safeVerifyToHaveText(this.validationDepartment, 'Nhập thuộc bộ phận');
  }

  async fillTeamName(teamname: string) {
    await this.safeClick(this.teamNameInput);
    await this.teamNameInput.clear();
    await this.safeFill(this.teamNameInput, teamname);
  }

  async fillTeamCode(teamcode: string) {
    await this.teamCodeInput.clear();
    await this.safeFill(this.teamCodeInput, teamcode);
  }

  async clickSelectDepartment() {
    await this.safeClick(this.dropdownDepartment);
    await this.safeClick(this.selectDepartment);
  }

  async clickTeamButton() {
    await this.safeClick(this.teamButton);
  }
}