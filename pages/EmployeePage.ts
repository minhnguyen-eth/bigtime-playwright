import { Locator, Page } from '@playwright/test';
import { ToastPage } from './ToastPage';
import { BasePage } from './BasePage';
import { ValidationPage } from './ValidationPage';

export class EmployeePage extends ValidationPage {
  readonly toastPage: ToastPage;
  readonly USER_BUTTON: Locator;
  readonly EMPLOYEE_NAME: Locator;
  readonly EMPLOYEE_CODE: Locator;
  readonly EMAIL: Locator;
  readonly DROPDOWN_EMPLOYEE_TYPE: Locator;
  readonly DROPDOWN_DEPARTMENT: Locator;
  readonly SELECT_DEPARTMENT: Locator;
  readonly SELECT_STAFF: Locator;
  readonly SET_SALARY: Locator;
  readonly SALARY_INPUT: Locator;
  readonly INSURANCE_INPUT: Locator;
  readonly ADD_ALLOWANCE: Locator;
  readonly DROPDOWN_ALLOWANCE: Locator;
  readonly SELECT_ALLOWANCE: Locator;
  readonly DROPDOWN_BRANCH: Locator;
  readonly SELECT_BRANCH: Locator;
  readonly DROPDOWN_INFO_MORE: Locator;
  readonly DROPDOWN_POSITION: Locator;
  readonly selectPosition: Locator;
  readonly dropdownRank: Locator;
  readonly selectRank: Locator;
  readonly citizenId: Locator;
  readonly citizenIdCardIssueDate: Locator;
  readonly chosseMonth: Locator;
  readonly selectMonth: Locator;
  readonly chosseYear: Locator;
  readonly SELECT_YEAR: Locator;
  readonly SELECT_DAY: Locator;
  readonly placeOfIssueOfIdentityCard: Locator;
  readonly BANK_NAME: Locator;
  readonly bankAccountNumber: Locator;
  readonly phoneNumber: Locator;
  readonly dateOfJoiningTheCompany: Locator;
  readonly ADDRESS: Locator;
  readonly DATE_OF_BIRTH: Locator;
  readonly selectMale: Locator;
  readonly addAllowanceTypeButton: Locator;
  readonly allowanceTypeName: Locator;
  readonly moneyAllowance: Locator;
  readonly dropdownAllowance2: Locator;
  readonly SEARCH_BY_CODE: Locator;
  readonly SEARCH_BY_NAME: Locator;
  readonly resultSearchByCode: Locator;
  readonly resultSearchByName: Locator;
  readonly dropdownRoleName: Locator;
  readonly managementDepartmentRole: Locator;

  readonly dailySalary: Locator;
  readonly dropdownSalaryType: Locator;
  readonly selectAdmin: Locator;
  readonly emailAddressExisted: Locator;
  readonly employeeCodeExisted: Locator;
  readonly dropdownGenderSearch: Locator;

  readonly dropdownDepartmentSearch: Locator;
  readonly departmentOption: Locator;
  readonly verifyDepartmentSearch: Locator;
  readonly checkBoxJustCheckInAtLeastOnceADay: Locator;
  readonly checkBoxJustCheckImAtLeastOneceWhenEnteingWork: Locator;
  readonly PAY_UNION_DUE_CHECKBOX: Locator;

  // DEPENDENTS (NGUOI PHU THUOC)
  readonly FAMILY_INFORMATION: Locator;
  readonly NAME_DEPENDENTS: Locator;
  readonly IS_DEPENDENTS_CHECKBOX: Locator;
  readonly START_DATE_DEPENDENTS: Locator;
  readonly END_DATE_DEPENDENTS: Locator;
  readonly RELATIONSHIP_DROPDOWN: Locator;

  // VALIDATE 
  readonly VALIDATE_EMAIL: Locator;
  readonly VALIDATE_START_DATE_DEPENDENTS: Locator;
  readonly validateEmployeeCode: Locator;
  readonly validateEmail: Locator;
  readonly validateEmployeeName: Locator;
  readonly validateRoleName: Locator;

  // VERIFY
  readonly VERIFY_RELATIONSHIP: Locator;
  readonly verifyMaleSearch: Locator;
  readonly verifyFemaleSearch: Locator;
  readonly verifyDataOfBirth: Locator;
  readonly verifyAddress: Locator;
  readonly verifyJoningTheCompany: Locator;
  readonly verifyDepartment: Locator;
  readonly verifyTeam: Locator;
  readonly verifyPosition: Locator;
  readonly verifyMinlenghtEmail: Locator;

  constructor(page: Page) {
    super(page);
    this.toastPage = new ToastPage(page);

    // VERIFY
    this.VERIFY_RELATIONSHIP = page.getByText('Con trai', { exact: true })

    // VALIDATE
    this.VALIDATE_START_DATE_DEPENDENTS = page.getByText('Nhập giảm trừ từ ngày');
    this.RELATIONSHIP_DROPDOWN = page.getByRole('combobox').filter({ hasText: 'Mối quan hệ ※' }).locator('i');
    this.END_DATE_DEPENDENTS = page.getByRole('textbox', { name: 'Giảm trừ đến ngày' });
    this.START_DATE_DEPENDENTS = page.getByRole('textbox', { name: 'Giảm trừ từ ngày ※' });
    this.IS_DEPENDENTS_CHECKBOX = page.getByRole('checkbox', { name: 'Là người phụ thuộc' });
    this.NAME_DEPENDENTS = page.getByRole('textbox', { name: 'Họ và tên ※' })
    this.FAMILY_INFORMATION = page.getByText('Thông tin gia đình', { exact: true });
    this.PAY_UNION_DUE_CHECKBOX = page.getByRole('checkbox', { name: 'Đóng tiền đoàn phí công đoàn' });
    this.checkBoxJustCheckImAtLeastOneceWhenEnteingWork = page.locator("//input[@aria-label='Chỉ cần điểm danh ít nhất 1 lần khi vào ca']");
    this.checkBoxJustCheckInAtLeastOnceADay = page.locator("//input[@aria-label='Chỉ cần điểm danh ít nhất 1 lần trong ngày']");
    this.verifyDepartmentSearch = page.locator('#row-0').getByText('Bộ phận IT', { exact: true })
    this.departmentOption = page.getByRole('option', { name: 'Bộ phận IT' })
    this.dropdownDepartmentSearch = page.getByRole('combobox').filter({ hasText: 'Bộ phận Bộ phận' }).locator('i');
    this.verifyMinlenghtEmail = page.locator("//li[contains(text(),'Tên email của bạn phải có từ 6 đến 30 ký tự.')]");
    this.verifyPosition = page.locator("//div[normalize-space()='QA']");
    this.verifyTeam = page.locator("//div[normalize-space()='Nhóm 1 Marketing']");
    this.verifyDepartment = page.locator("//div[contains(text(),'Bộ phận Marketing')]");
    this.verifyJoningTheCompany = page.locator("//div[normalize-space()='08-07-2025']");
    this.verifyAddress = page.locator("//div[normalize-space()='Bien Hoa, Dong Nai']");
    this.verifyDataOfBirth = page.locator("//div[normalize-space()='08-08-2014']");
    this.verifyFemaleSearch = page.locator("//tr[@id='row-0']//div[contains(text(),'Nữ')]").first();
    this.verifyMaleSearch = page.locator("//tr[@id='row-0']//div[contains(text(),'Nam')]").first();
    this.dropdownGenderSearch = page.getByRole('combobox').filter({ hasText: 'Giới tính' }).locator('i')
    this.validateRoleName = page.locator("//div[contains(text(),'Nhập tên quyền')]");
    this.validateEmail = page.locator("//div[contains(text(),'Nhập Email')]");
    this.validateEmployeeName = page.locator("//div[contains(text(),'Nhập tên nhân viên')]");
    this.validateEmployeeCode = page.locator("//div[contains(text(),'Nhập mã nhân viên')]");
    this.employeeCodeExisted = page.locator("//li[contains(text(),'Mã nhân viên đã tồn tại.')]");
    this.emailAddressExisted = page.locator("//li[contains(text(),'Địa chỉ email đã tồn tại.')]");
    this.dropdownSalaryType = page.getByRole('combobox').filter({ hasText: 'Loại lương Cố định' }).locator('i');
    this.dailySalary = page.locator("//div[contains(text(),'Theo ngày')]");
    this.VALIDATE_EMAIL = page.locator("//li[contains(text(),'Định dạng Địa chỉ email không hợp lệ.')]").first();
    this.managementDepartmentRole = page.locator("//div[text()='Trưởng bộ phận']");
    this.dropdownRoleName = page.getByRole('textbox', { name: 'Tên quyền ※' });
    this.resultSearchByName = page.locator("//tr[@id='row-0']//span[contains(text(),'Nguyễn Văn Minh')]");
    this.resultSearchByCode = page.locator("//a[normalize-space()='BAT810']");
    this.SEARCH_BY_NAME = page.getByRole('textbox', { name: 'Tên nhân viên' });
    this.SEARCH_BY_CODE = page.getByRole('textbox', { name: 'Mã nhân viên' });
    this.moneyAllowance = page.getByRole('textbox', { name: 'Phụ cấp thụ hưởng ※' });
    this.allowanceTypeName = page.getByRole('textbox', { name: 'Tên phụ cấp ※' });
    this.addAllowanceTypeButton = page.locator("//span[contains(normalize-space(),'+ Thêm loại phụ cấp')]");
    this.selectMale = page.locator("//input[@aria-label='Nam']");
    this.DATE_OF_BIRTH = page.getByRole('textbox', { name: 'Ngày sinh' });
    this.ADDRESS = page.getByRole('textbox', { name: 'Địa chỉ' });
    this.dateOfJoiningTheCompany = page.getByRole('textbox', { name: 'Ngày vào công ty' });
    this.phoneNumber = page.getByRole('spinbutton', { name: 'Số điện thoại' });
    this.bankAccountNumber = page.getByRole('spinbutton', { name: 'Số tài khoản ngân hàng' });
    this.BANK_NAME = page.getByRole('textbox', { name: 'Tên ngân hàng' })
    this.placeOfIssueOfIdentityCard = page.getByRole('textbox', { name: 'Nơi cấp CCCD' })
    this.selectRank = page.locator("//div[@class='v-list-item-title'][normalize-space()='Intern']");
    this.SELECT_DAY = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='8']");
    this.selectMonth = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='Thg 8']");
    this.SELECT_YEAR = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='2014']");
    this.chosseYear = page.getByRole('button', { name: 'Open years overlay' });
    this.chosseMonth = page.getByRole('button', { name: 'Open months overlay' });
    this.citizenIdCardIssueDate = page.getByRole('textbox', { name: 'Ngày cấp CCCD' });
    this.citizenId = page.getByRole('spinbutton', { name: 'CCCD' })
    this.dropdownRank = page.getByRole('textbox', { name: 'Tên cấp bậc' });
    this.selectPosition = page.locator("//div[@class='v-list-item-title'][normalize-space()='QA']");
    this.DROPDOWN_POSITION = page.getByRole('textbox', { name: 'Tên chức vụ' });
    this.DROPDOWN_INFO_MORE = page.getByRole('button', { name: 'Thông tin thêm' });
    this.SELECT_BRANCH = page.locator("//div[text()='Biên Hòa']");
    this.DROPDOWN_BRANCH = page.getByRole('textbox', { name: 'Tên chi nhánh ※' });
    this.SELECT_ALLOWANCE = page.getByText('Phụ cấp tiền ăn', { exact: true });
    this.DROPDOWN_ALLOWANCE = page.getByRole('combobox').filter({ hasText: /^$/ }).locator('i');
    this.dropdownAllowance2 = page.getByRole('combobox').filter({ hasText: /^$/ }).locator('i');
    this.ADD_ALLOWANCE = page.locator("//span[contains(.,'+Thêm phụ cấp')]");
    this.INSURANCE_INPUT = page.getByRole('textbox', { name: 'Mức bảo hiểm' })
    this.SALARY_INPUT = page.getByRole('textbox', { name: 'Mức lương' })
    this.SET_SALARY = page.locator("//span[contains(normalize-space(),'Thiết lập lương')]");
    this.SELECT_DEPARTMENT = page.locator("//div[text()='Bộ phận Marketing']");
    this.DROPDOWN_DEPARTMENT = page.getByRole('textbox', { name: 'Thuộc bộ phận' });
    this.SELECT_STAFF = page.getByRole('option', { name: 'Nhân viên' });
    this.selectAdmin = page.getByRole('option', { name: 'Quản lý' });
    this.DROPDOWN_EMPLOYEE_TYPE = page.getByRole('textbox', { name: 'Loại nhân viên ※' });
    this.EMAIL = page.getByRole('textbox', { name: 'Email ※' })
    this.EMPLOYEE_NAME = page.getByRole('textbox', { name: 'Tên nhân viên ※' })
    this.EMPLOYEE_CODE = page.getByRole('textbox', { name: 'Mã nhân viên ※' })
    this.USER_BUTTON = page.getByRole('link', { name: 'Nhân viên', exact: true });
  }

  // VERIFY
  async verifyRelationship(relationship: string) {
    const locator = this.page.getByText(relationship, { exact: true });
    await this.safeVerifyToHaveText(locator, relationship);
  }

  async verifyNameDependents(name: string) {
    const locator = this.page.getByText('Automation test dependent...', { exact: true });
    await this.safeVerifyTextContains(locator, name);
  }

  async verifyTaxCode(taxCode: string) {
    const locator = this.page.getByText('01234564895', { exact: true });
    await this.safeVerifyToHaveText(locator, taxCode);
  }

  async verifyIsDependents() {
    const locator = this.page.locator("//td[normalize-space()='Có']");
    await this.safeVerifyToHaveText(locator, 'Có');
  }

  // VALIDATE

  async verifyValidateStartDateDependents() {
    await this.safeVerifyToHaveText(this.VALIDATE_START_DATE_DEPENDENTS, 'Nhập giảm trừ từ ngày');
  }

  async selectRelationship(relationship: string) {
    const locator = this.page.locator(`//div[contains(text(),'${relationship}')]`);
    await this.safeClick(locator);
  }

  async clickRelationshipDropdown() {
    await this.safeClick(this.RELATIONSHIP_DROPDOWN, { first: true });
  }

  async clickStartDateDependents() {
    await this.safeClick(this.START_DATE_DEPENDENTS);
  }

  async clickEndDateDependents() {
    await this.safeClick(this.END_DATE_DEPENDENTS);
  }

  async checkIsDependents() {
    await this.safeCheckbox(this.IS_DEPENDENTS_CHECKBOX);
  }

  async fillNameDependents(name: string) {
    await this.safeFill(this.NAME_DEPENDENTS, name);
  }

  async clickFamilyInformation() {
    await this.safeClick(this.FAMILY_INFORMATION, { nth: 1 });
  }

  async selectGenderSearch(value: string) {
    const locator = this.page.getByRole('option', { name: value });
    await this.safeClick(locator);
  }

  async selectPayUnionDue() {
    await this.safeClick(this.PAY_UNION_DUE_CHECKBOX);
  }

  async checkJustCheckInAtLeastOnceADay() {
    await this.checkBoxJustCheckInAtLeastOnceADay.check();
  }

  async checkJustCheckImAtLeastOneceWhenEnteringWork() {
    await this.checkBoxJustCheckImAtLeastOneceWhenEnteingWork.check();
  }

  async expectDepartmentSearch() {
    await this.safeVerifyTextContains(this.verifyDepartmentSearch, 'Bộ phận IT');
  }

  async expectValidateMinLengthEmail() {
    await this.safeVerifyToHaveText(this.verifyMinlenghtEmail, 'Tên email của bạn phải có từ 6 đến 30 ký tự.');
  }

  async expectTeamIsDisplayed() {
    await this.safeVerifyTextContains(this.verifyTeam, 'Nhóm 1 Marketing');
  }

  async expectDepartmentIsDisplayed() {
    await this.safeVerifyTextContains(this.verifyDepartment, 'Marketing');
  }

  async expectPositionIsDisplayed() {
    await this.safeVerifyTextContains(this.verifyPosition, 'QA');
  }

  async expectJoningTheCompanyIsDisplayed() {
    await this.safeVerifyTextContains(this.verifyJoningTheCompany, '2025');
  }

  async expectAddressIsDisplayed() {
    await this.safeVerifyTextContains(this.verifyAddress, 'Bien Hoa, Dong Nai');
  }

  async expectDateOfBirthIsDisplayed() {
    await this.safeVerifyTextContains(this.verifyDataOfBirth, '08-08-2014');
  }

  async clickDropdownGenderSearch() {
    await this.safeClick(this.dropdownGenderSearch);
  }

  async clickRoleAdmin() {
    await this.safeClick(this.selectAdmin);
  }

  async clickDropdownSalaryType() {
    await this.safeClick(this.dropdownSalaryType);
  }

  async clickDailySalary() {
    await this.safeClick(this.dailySalary);
  }

  async clickManagementDepartmentRole() {
    await this.safeClick(this.managementDepartmentRole);
  }

  async clickDropdownRoleName() {
    await this.safeClick(this.dropdownRoleName);
  }

  async fillSearchByCode(code: string) {
    await this.safeFill(this.SEARCH_BY_CODE, code);
  }

  async fillSearchByName(name: string) {
    await this.safeFill(this.SEARCH_BY_NAME, name);
  }

  async clickDropdownAllowance2() {
    await this.safeClick(this.dropdownAllowance2);
  }

  async clickDropdownDepartmentSearch() {
    await this.safeClick(this.dropdownDepartmentSearch);
  }

  async fillMoneyAllowance(money: string) {
    await this.safeFill(this.moneyAllowance, money);
  }

  async fillAllowanceTypeName(typeName: string) {
    await this.safeFill(this.allowanceTypeName, typeName);
  }

  async clickAddAllowanceTypeButton() {
    await this.safeClick(this.addAllowanceTypeButton);
  }

  async clickSelectMale() {
    await this.selectMale.check();
  }

  async clickDateOfBirth() {
    await this.safeClick(this.DATE_OF_BIRTH);
  }

  async fillAddress(address: string) {
    await this.safeFill(this.ADDRESS, address);
  }

  async clickDateOfJoiningTheCompany() {
    await this.safeClick(this.dateOfJoiningTheCompany);
  }

  async fillPhoneNumber(phone: string) {
    await this.safeFill(this.phoneNumber, phone);
  }

  async fillBankAccountNumber(bankAccount: string) {
    await this.safeFill(this.bankAccountNumber, bankAccount);
  }

  async fillBankName(bank: string) {
    await this.safeFill(this.BANK_NAME, bank);
  }

  async fillPlaceOfIssueOfIdentityCard(place: string) {
    await this.safeFill(this.placeOfIssueOfIdentityCard, place);
  }

  async clickSelectRank() {
    await this.safeClick(this.selectRank, { first: true });
  }

  async clickSelectDay() {
    await this.safeClick(this.SELECT_DAY);
    await this.clickChoose();
  }

  async clickChosseYear() {
    await this.safeClick(this.chosseYear);
  }

  async clickSelectYear() {
    await this.safeClick(this.SELECT_YEAR);
  }

  async clickChosseMonth() {
    await this.safeClick(this.chosseMonth);
  }

  async clickSelectMonth() {
    await this.safeClick(this.selectMonth);
  }

  async clickCitizenIdCardIssueDate() {
    await this.safeClick(this.citizenIdCardIssueDate);
  }

  async fillCitizenIdMaxlength(id: string) {
    await this.safeFill(this.citizenId, id);
  }

  async fillCitizenId(date: number) {
    await this.citizenId.waitFor({ state: 'visible' });
    await this.citizenId.clear();
    await this.citizenId.fill(date.toString());
  }

  async clickDropdownRank() {
    await this.safeClick(this.dropdownRank);
  }

  async clickPosition() {
    await this.safeClick(this.selectPosition);
  }

  async clickDropdownPosition() {
    await this.safeClick(this.DROPDOWN_POSITION);
  }

  async clickDropdownInfoMore() {
    await this.safeClick(this.DROPDOWN_INFO_MORE);
  }

  async clickDepartmentOptions() {
    await this.safeClick(this.departmentOption);
  }

  async clickSelectBranch() {
    await this.safeClick(this.SELECT_BRANCH);
  }

  async clickDropdownBranch() {
    await this.safeClick(this.DROPDOWN_BRANCH);
  }

  async clickSelectAllowance() {
    await this.safeClick(this.SELECT_ALLOWANCE);
  }

  async clickDropdownAllowance() {
    await this.safeClick(this.DROPDOWN_ALLOWANCE);
  }

  async clickAddAllowance() {
    await this.safeClick(this.ADD_ALLOWANCE);
  }
  async toggleAllowance() {
    const wrapper = this.page.locator('div.v-switch');
    await wrapper.click();
  }

  async fillFillInsurance(insurance: string) {
    await this.safeFill(this.INSURANCE_INPUT, insurance);
  }

  async clickSetSalary() {
    await this.safeClick(this.SET_SALARY);
  }

  async fillFillSalary(salary: string) {
    await this.safeFill(this.SALARY_INPUT, salary);
  }

  async fillEmail(email: string) {
    await this.safeFill(this.EMAIL, email);
  }

  async clickDropdownEmployeeType() {
    await this.safeClick(this.DROPDOWN_EMPLOYEE_TYPE);
  }

  async clickStaff() {
    await this.safeClick(this.SELECT_STAFF);
  }

  async clickDropdownDepartment() {
    await this.safeClick(this.DROPDOWN_DEPARTMENT);
  }

  async clickSelectDepartment(departmentName: string) {
    const locator = this.page.locator(`//div[text()='${departmentName}']`);
    await this.safeClick(locator);
  }

  async fillEmployeeName(name: string) {
    await this.EMPLOYEE_NAME.clear();
    await this.safeFill(this.EMPLOYEE_NAME, name);
  }

  async fillEmployeeCode(code: string) {
    await this.safeFill(this.EMPLOYEE_CODE, code);
  }

  async clickUser() {
    await this.safeClick(this.USER_BUTTON);
  }

  // FUNCTION VERIFY 
  async validateRequiredFields() {
    const validations = [
      { locator: this.validateRoleName, expectedText: 'Nhập tên quyền' },
      { locator: this.validateEmail, expectedText: 'Nhập Email' },
      { locator: this.validateEmployeeName, expectedText: 'Nhập tên nhân viên' },
      { locator: this.validateEmployeeCode, expectedText: 'Nhập mã nhân viên' },
    ];

    for (const validation of validations) {
      await this.safeVerifyToHaveText(validation.locator, validation.expectedText);
    }
  }

  async verifyEmployeeCodeExisted() {
    await this.safeVerifyToHaveText(this.employeeCodeExisted, "Mã nhân viên đã tồn tại.");
  }

  async verifyEmailExisted() {
    await this.safeVerifyToHaveText(this.emailAddressExisted, "Địa chỉ email đã tồn tại.");
  }

  async verifyValidateEmail() {
    await this.safeVerifyToHaveText(this.VALIDATE_EMAIL, "Định dạng Địa chỉ email không hợp lệ.");
  }

  async verifySearchByCode() {
    await this.safeVerifyToHaveText(this.resultSearchByCode, "BAT810");
  }

  async verifySearchByName() {
    await this.safeVerifyToHaveText(this.resultSearchByName, "Nguyễn Văn Minh");
  }

  async verifyVerifyMaleSearch() {
    await this.safeVerifyToHaveText(this.verifyMaleSearch, "Nam");
  }

  async verifyVerifyFemaleSearch() {
    await this.safeVerifyToHaveText(this.verifyFemaleSearch, "Nữ");
  }

  // FUNCTION HANDLE 
  async deleteAUser() {
    await this.clickRow0();
    await this.clickDelete();
    await this.toastPage.getToastDeleteSuccess();
  }

  async testSaveWithoutAnyInformation() {
    await this.clickAdd();
    await this.clickSave();
    await this.validateRequiredFields();
  }

  async testEditEmployeeName() {
    await this.clickRow0();
    await this.clickEdit();
    await this.fillEmployeeName('Automation test edit');
    await this.clickSave();
    await this.toastPage.getToastUpdateSuccess();
  }

  async testEditEmployeeCode() {
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const userEditCode = `userEditCode${randomSuffix}`;

    await this.clickRow0();
    await this.clickEdit();
    await this.fillEmployeeCode(userEditCode);
    await this.clickSave();
    await this.toastPage.getToastUpdateSuccess();
  }

  async addWithDuplicateCodeAndEmail() {
    await this.clickAdd();
    await this.fillEmployeeCode('BAT810');
    await this.fillEmployeeName('Automation test');
    await this.fillEmail('minhnguyen.eth');
    await this.clickDropdownBranch();
    await this.clickSelectBranch();
    await this.clickDropdownDepartment();
    await this.clickSelectDepartment('Bộ phận IT');
    await this.clickDropdownEmployeeType();
    await this.clickStaff();
    await this.clickSave();
    await this.toastPage.getToastAddFailed();
    await this.verifyEmailExisted();
    await this.verifyEmployeeCodeExisted();
  }

  async addWithRoleDepartmentManager() {
    await this.testAddEmployee();
    await this.clickDropdownEmployeeType();
    await this.clickAdmin();
    await this.clickDropdownRoleName();
    await this.clickManagementDepartmentRole();
    await this.clickSave();
    await this.toastPage.getToastAddSuccess();
  }

  async addWithWrongFormatEmail() {
    await this.testAddEmployee();
    await this.fillEmail('Tét123456');
    await this.clickSave();
    await this.verifyValidateEmail();
    await this.toastPage.getToastAddFailed();
  }

  async testMinlengthEmail() {
    await this.testAddEmployee();
    await this.fillEmail('minh');
    await this.clickSave();
    await this.validateMinlengthEmail();
  }

  async testAddEmployee() {
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const randomAllowanceName = `Phụ cấp${randomSuffix}`;
    const userCode = `userCode${randomSuffix}`;
    const emailRandom = `email${randomSuffix}`;

    await this.clickAdd();

    // Fill information
    await this.fillEmployeeCode(userCode);
    await this.fillEmployeeName('Automation test');
    await this.fillEmail(emailRandom);
    await this.clickSelectMale();
    await this.clickDropdownBranch();
    await this.clickSelectBranch();
    await this.clickDropdownDepartment();
    await this.clickSelectDepartment('Bộ phận IT');
    await this.clickDropdownEmployeeType();
    await this.clickStaff();
  }

  async testAddAndSetSalaryByDate() {
    await this.testAddEmployee();
    // Set daily day salary 
    await this.testSetSalary();
    await this.clickDropdownSalaryType();
    await this.clickDailySalary();
    await this.fillFillSalary('22000000');
    await this.fillFillInsurance('500000');
    await this.clickSave();
    await this.toastPage.getToastAddSuccess();
  }

  async addWithoutSetSalary() {
    await this.testAddEmployee();
  }

  async addWithRoleEmployee() {
    await this.testAddEmployee();
    await this.testFillMoreInformation();
    await this.testSetSalary();
    await this.clickSave();
    await this.toastPage.getToastAddSuccess();
  }

  async searchByEmployeeCode() {
    await this.fillSearchByCode('BAT810');
    await this.clickSearch();
    await this.verifySearchByCode();
    await this.clickClearSearch();
  }

  async searchByEmployeeCodeAndName() {
    await this.fillSearchByCode('BAT810');
    await this.fillSearchByName('Nguyễn Văn Minh');
    await this.clickSearch();
    await this.verifySearchByCode();
    await this.verifySearchByName();
    await this.clickClearSearch();
  }

  async searchByDepartment() {
    await this.clickDropdownDepartmentSearch();
    await this.clickDepartmentOptions();
    await this.clickSearch();
    await this.expectDepartmentSearch();

  }

  async searchByEmployeeName() {
    await this.fillSearchByName('Nguyễn Văn Minh');
    await this.clickSearch();
    await this.verifySearchByName();
    await this.clickClearSearch();
  }

  async searchByGender() {
    // Search by gender
    await this.clickDropdownGenderSearch();
    await this.selectGenderSearch('Nam');
    await this.clickSearch();
    await this.verifyVerifyMaleSearch();
    await this.clickClearSearch();

    await this.clickDropdownGenderSearch();
    await this.selectGenderSearch('Nữ');
    await this.clickSearch();
    await this.verifyVerifyFemaleSearch();
    await this.clickClearSearch();
  }

  async testFillMoreInformation() {
    const random10Digits = Math.floor(1000000000 + Math.random() * 9000000000);
    const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;

    // Fill more information
    await this.clickDropdownPosition();
    await this.clickPosition();
    await this.clickDropdownRank();
    await this.clickSelectRank();
    await this.fillCitizenId(random10Digits);

    await this.page.evaluate(() => {
      window.scrollBy(0, -1000);
    }); // Scroll up

    await this.clickCitizenIdCardIssueDate();
    await this.clickTodayDatePicker();

    await this.fillPlaceOfIssueOfIdentityCard('Bien Hoa, Dong Nai');
    await this.fillBankName('Vietcombank');
    await this.fillBankAccountNumber('02847182497124');
    await this.fillPhoneNumber(phoneNumber);
    await this.fillAddress('Bien Hoa, Dong Nai');
    await this.fillNote('Automation testing');
    await this.page.evaluate(() => {
      window.scrollBy(0, -1000);
    });
    await this.clickDateOfBirth();
    await this.clickOpenYearOverlayButton();
    await this.clickSelectYear();
    // await this.clickChosseMonth();
    // await this.clickSelectMonth();
    await this.clickSelectDay();
    await this.clickDateOfJoiningTheCompany();
    await this.clickTodayDatePicker();
  }

  async testSetSalary() {
    await this.clickSetSalary();
    await this.fillFillSalary('22000000');
    await this.fillFillInsurance('500000');
    await this.toggleAllowance();
    await this.clickAddAllowance();
    await this.clickDropdownAllowance();
    await this.clickSelectAllowance();

    // await this.clickAddAllowance();
    // await this.clickDropdownAllowance2();
    // await this.clickAddAllowanceTypeButton();
    // await this.fillAllowanceTypeName(randomAllowanceName);
    // await this.fillMoneyAllowance('100000');
    // await this.clickConfirm();
  }
}
