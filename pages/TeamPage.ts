import { expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TeamPage extends BasePage {
  readonly TEAM_BUTTON: Locator;
  readonly TEAM_NAME_INPUT: Locator;
  readonly TEAM_CODE_INPUT: Locator;
  readonly DROPDOWN_DEPARTMENT: Locator;
  readonly SELECT_DEPARTMENT: Locator;
  readonly VALIDATION_NAME: Locator;
  readonly VALIDATION_CODE: Locator;
  readonly VALIDATION_DEPARTMENT: Locator;
  readonly INPUT_SEARCH_BY_NAME: Locator;
  readonly INPUT_SEARCH_BY_CODE: Locator;
  readonly VALIDATE_CODE_EXIST: Locator;
  readonly VALIDATE_NAME_EXIST: Locator;
  readonly RESULT_SEARCH_BY_NAME: Locator;
  readonly RESULT_SEARCH_BY_CODE: Locator;

  constructor(page: Page) {
    super(page);
    this.RESULT_SEARCH_BY_CODE = page.locator("//tr[@id='row-0']//span[contains(text(),'T001')]");
    this.RESULT_SEARCH_BY_NAME = page.locator("//tr[@id='row-0']//span[contains(text(),'Nhóm It1')]");
    this.VALIDATE_NAME_EXIST = page.locator("//li[contains(text(),'Tên đã tồn tại.')]");
    this.VALIDATE_CODE_EXIST = page.locator("//li[contains(text(),'Mã đã tồn tại.')]");
    this.INPUT_SEARCH_BY_CODE = page.getByRole('textbox', { name: 'Mã nhóm' });
    this.INPUT_SEARCH_BY_NAME = page.getByRole('textbox', { name: 'Tên nhóm' });
    this.VALIDATION_NAME = page.locator("//div[contains(text(),'Nhập tên nhóm')]");
    this.VALIDATION_CODE = page.locator("//div[contains(text(),'Nhập mã nhóm')]");
    this.VALIDATION_DEPARTMENT = page.locator("//div[contains(text(),'Nhập thuộc bộ phận')]");
    this.SELECT_DEPARTMENT = page.locator("//div[text()='Bộ phận Marketing']");
    this.DROPDOWN_DEPARTMENT = page.locator("//i[@title='Open']");
    this.TEAM_CODE_INPUT = page.getByRole('textbox', { name: 'Mã nhóm ※' });
    this.TEAM_NAME_INPUT = page.getByRole('textbox', { name: 'Tên nhóm ※' });
    this.TEAM_BUTTON = page.locator("//div[contains(text(),'Nhóm')]");
  }

  async getResultSearchByName() {
    await this.safeVerifyToHaveText(this.RESULT_SEARCH_BY_NAME, 'Nhóm It1');
  }

  async getResultSearchByCode() {
    await this.safeVerifyToHaveText(this.RESULT_SEARCH_BY_CODE, 'T001');
  }

  async getValidateCodeExist() {
    await this.safeVerifyToHaveText(this.VALIDATE_CODE_EXIST, 'Mã đã tồn tại.');
  }

  async searchByTeamCode(code: string) {
    await this.safeFill(this.INPUT_SEARCH_BY_CODE, code);
  }

  async searchByTeamName(name: string) {
    await this.safeFill(this.INPUT_SEARCH_BY_NAME, name);
  }

  async validateRequiredFields() {
    await this.safeVerifyToHaveText(this.VALIDATION_NAME, 'Nhập tên nhóm');
    await this.safeVerifyToHaveText(this.VALIDATION_CODE, 'Nhập mã nhóm');
    await this.safeVerifyToHaveText(this.VALIDATION_DEPARTMENT, 'Nhập thuộc bộ phận');
  }

  async fillTeamName(teamname: string) {
    await this.safeClick(this.TEAM_NAME_INPUT);
    await this.TEAM_NAME_INPUT.clear();
    await this.safeFill(this.TEAM_NAME_INPUT, teamname);
  }

  async fillTeamCode(teamcode: string) {
    await this.TEAM_CODE_INPUT.clear();
    await this.safeFill(this.TEAM_CODE_INPUT, teamcode);
  }

  async clickSelectDepartment() {
    await this.safeClick(this.DROPDOWN_DEPARTMENT);
    await this.safeClick(this.SELECT_DEPARTMENT);
  }

  async clickTeamButton() {
    await this.safeClick(this.TEAM_BUTTON);
  }
}
