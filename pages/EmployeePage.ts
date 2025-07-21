import { Locator, Page } from '@playwright/test';
import { ToastPage } from './ToastPage';
import { BasePage } from './BasePage';

export class EmployeePage extends BasePage {
  readonly toastPage: ToastPage;
  readonly userButton: Locator;
  readonly employeeName: Locator;
  readonly employeeCode: Locator;
  readonly email: Locator;
  readonly dropdownEmployeeType: Locator;
  readonly dropdownDepartment: Locator;
  readonly selectDepartment: Locator;
  readonly selectStaff: Locator;
  readonly setSalary: Locator;
  readonly fillSalary: Locator;
  readonly fillInsurance: Locator;
  readonly openAllowance: Locator;
  readonly addAllowance: Locator;
  readonly dropdownAllowance: Locator;
  readonly selectAllowance: Locator;
  readonly dropdownBranch: Locator;
  readonly selectBranch: Locator;
  readonly dropdownInfoMore: Locator;
  readonly dropdownPosition: Locator;
  readonly selectPosition: Locator;
  readonly dropdownRank: Locator;
  readonly selectRank: Locator;
  readonly citizenId: Locator;
  readonly citizenIdCardIssueDate: Locator;
  readonly chosseMonth: Locator;
  readonly selectMonth: Locator;
  readonly chosseYear: Locator;
  readonly selectYear: Locator;
  readonly selectDay: Locator;
  readonly placeOfIssueOfIdentityCard: Locator;
  readonly bankName: Locator;
  readonly bankAccountNumber: Locator;
  readonly phoneNumber: Locator;
  readonly dateOfJoiningTheCompany: Locator;
  readonly address: Locator;
  readonly dateOfBirth: Locator;
  readonly selectMale: Locator;
  readonly addAllowanceTypeButton: Locator;
  readonly allowanceTypeName: Locator;
  readonly moneyAllowance: Locator;
  readonly confirm: Locator;
  readonly dropdownAllowance2: Locator;
  readonly searchByCode: Locator;
  readonly searchByName: Locator;
  readonly resultSearchByCode: Locator;
  readonly resultSearchByName: Locator;
  readonly dropdownRoleName: Locator;
  readonly managementDepartmentRole: Locator;
  readonly cancelAdd: Locator;
  readonly emailError: Locator;
  readonly dailySalary: Locator;
  readonly dropdownSalaryType: Locator;
  readonly selectAdmin: Locator;
  readonly emailAddressExisted: Locator;
  readonly employeeCodeExisted: Locator;
  readonly validateEmployeeCode: Locator;
  readonly validateEmail: Locator;
  readonly validateEmployeeName: Locator;
  readonly validateRoleName: Locator;
  readonly dropdownGenderSearch: Locator;
  readonly checkBoxGender: Locator;
  readonly verifyMaleSearch: Locator;
  readonly verifyFemaleSearch: Locator;
  readonly verifyDataOfBirth: Locator;
  readonly verifyAddress: Locator;
  readonly verifyJoningTheCompany: Locator;
  readonly verifyDepartment: Locator;
  readonly verifyTeam: Locator;
  readonly verifyPosition: Locator;
  readonly verifyMinlenghtEmail: Locator;
  readonly dropdownDepartmentSearch: Locator;
  readonly departmentOption: Locator;
  readonly verifyDepartmentSearch: Locator;

  constructor(page: Page) {
    super(page);
    this.toastPage = new ToastPage(page);
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
    this.checkBoxGender = page.locator("//input[@type='checkbox']");
    this.dropdownGenderSearch = page.getByRole('combobox').filter({ hasText: 'Giới tính' }).locator('i')
    this.validateRoleName = page.locator("//div[contains(text(),'Nhập tên quyền')]");
    this.validateEmail = page.locator("//div[contains(text(),'Nhập Email')]");
    this.validateEmployeeName = page.locator("//div[contains(text(),'Nhập tên nhân viên')]");
    this.validateEmployeeCode = page.locator("//div[contains(text(),'Nhập mã nhân viên')]");
    this.employeeCodeExisted = page.locator("//li[contains(text(),'Mã nhân viên đã tồn tại.')]");
    this.emailAddressExisted = page.locator("//li[contains(text(),'Địa chỉ email đã tồn tại.')]");
    this.dropdownSalaryType = page.getByRole('combobox').filter({ hasText: 'Loại lương Cố định' }).locator('i');
    this.dailySalary = page.locator("//div[contains(text(),'Theo ngày')]");
    this.emailError = page.locator("//li[contains(text(),'Định dạng Địa chỉ email không hợp lệ.')]");
    this.managementDepartmentRole = page.locator("//div[text()='Trưởng bộ phận']");
    this.dropdownRoleName = page.getByRole('textbox', { name: 'Tên quyền ※' });
    this.resultSearchByName = page.locator("//tr[@id='row-0']//span[contains(text(),'Nguyễn Văn Minh')]");
    this.resultSearchByCode = page.locator("//a[normalize-space()='BAT810']");
    this.searchByName = page.getByRole('textbox', { name: 'Tên nhân viên' });
    this.searchByCode = page.getByRole('textbox', { name: 'Mã nhân viên' });
    this.moneyAllowance = page.getByRole('textbox', { name: 'Phụ cấp thụ hưởng ※' });
    this.allowanceTypeName = page.getByRole('textbox', { name: 'Tên phụ cấp ※' });
    this.addAllowanceTypeButton = page.locator("//span[contains(normalize-space(),'+ Thêm loại phụ cấp')]");
    this.selectMale = page.locator("//input[@aria-label='Nam']");
    this.dateOfBirth = page.getByRole('textbox', { name: 'Ngày sinh' });
    this.address = page.getByRole('textbox', { name: 'Địa chỉ' });
    this.dateOfJoiningTheCompany = page.getByRole('textbox', { name: 'Ngày vào công ty' });
    this.phoneNumber = page.getByRole('spinbutton', { name: 'Số điện thoại' });
    this.bankAccountNumber = page.getByRole('spinbutton', { name: 'Số tài khoản ngân hàng' });
    this.bankName = page.getByRole('textbox', { name: 'Tên ngân hàng' })
    this.placeOfIssueOfIdentityCard = page.getByRole('textbox', { name: 'Nơi cấp CCCD' })
    this.selectRank = page.locator("//div[@class='v-list-item-title'][normalize-space()='Intern']");
    this.selectDay = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='8']");
    this.selectMonth = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='Thg 8']");
    this.selectYear = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='2014']");
    this.chosseYear = page.getByRole('button', { name: 'Open years overlay' });
    this.chosseMonth = page.getByRole('button', { name: 'Open months overlay' });
    this.citizenIdCardIssueDate = page.getByRole('textbox', { name: 'Ngày cấp CCCD' });
    this.citizenId = page.getByRole('spinbutton', { name: 'CCCD' })
    this.dropdownRank = page.getByRole('textbox', { name: 'Tên cấp bậc' });
    this.selectPosition = page.locator("//div[@class='v-list-item-title'][normalize-space()='QA']");
    this.dropdownPosition = page.getByRole('textbox', { name: 'Tên chức vụ' });
    this.dropdownInfoMore = page.getByRole('button', { name: 'Thông tin thêm' });
    this.selectBranch = page.locator("//div[text()='Biên Hòa']");
    this.dropdownBranch = page.getByRole('textbox', { name: 'Tên chi nhánh ※' });
    this.selectAllowance = page.locator("//div[contains(text(),'Phụ cấp tiền ăn')]");
    this.dropdownAllowance = page.getByRole('combobox').filter({ hasText: /^$/ }).locator('i');
    this.dropdownAllowance2 = page.getByRole('combobox').filter({ hasText: /^$/ }).locator('i');
    this.addAllowance = page.locator("//span[contains(.,'+Thêm phụ cấp')]");
    this.openAllowance = page.locator("(//input[@type='checkbox'])[4]");
    this.fillInsurance = page.getByRole('textbox', { name: 'Mức bảo hiểm' })
    this.fillSalary = page.getByRole('textbox', { name: 'Mức lương' })
    this.setSalary = page.locator("//span[contains(normalize-space(),'Thiết lập lương')]");
    this.selectDepartment = page.locator("//div[text()='Bộ phận Marketing']");
    this.dropdownDepartment = page.getByRole('textbox', { name: 'Thuộc bộ phận' });
    this.selectStaff = page.locator("//div[@class='v-list-item-title'][normalize-space()='Staff']");
    this.selectAdmin = page.locator("//div[@class='v-list-item-title'][normalize-space()='Admin']");
    this.dropdownEmployeeType = page.getByRole('textbox', { name: 'Loại nhân viên ※' });
    this.email = page.getByRole('textbox', { name: 'Email ※' })
    this.employeeName = page.getByRole('textbox', { name: 'Tên nhân viên ※' })
    this.employeeCode = page.getByRole('textbox', { name: 'Mã nhân viên ※' })
    this.userButton = page.locator("//div[contains(text(),'Nhân viên')]");
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

  async selectMaleSearch() {
    await this.checkBoxGender.first().check();
  }

  async selectFemaleSearch() {
    await this.checkBoxGender.nth(1).check();
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
    await this.safeFill(this.searchByCode, code);
  }

  async fillSearchByName(name: string) {
    await this.safeFill(this.searchByName, name);
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
    await this.safeClick(this.dateOfBirth);
  }

  async fillAddress(address: string) {
    await this.safeFill(this.address, address);
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
    await this.safeFill(this.bankName, bank);
  }

  async fillPlaceOfIssueOfIdentityCard(place: string) {
    await this.safeFill(this.placeOfIssueOfIdentityCard, place);
  }

  async clickSelectRank() {
    await this.safeClick(this.selectRank);
  }

  async clickSelectDay() {
    await this.safeClick(this.selectDay);
    await this.clickChoose();
  }

  async clickChosseYear() {
    await this.safeClick(this.chosseYear);
  }

  async clickSelectYear() {
    await this.safeClick(this.selectYear);
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
    await this.safeClick(this.dropdownPosition);
  }

  async clickDropdownInfoMore() {
    await this.safeClick(this.dropdownInfoMore);
  }

  async clickDepartmentOptions() {
    await this.safeClick(this.departmentOption);
  }

  async clickSelectBranch() {
    await this.safeClick(this.selectBranch);
  }

  async clickDropdownBranch() {
    await this.safeClick(this.dropdownBranch);
  }

  async clickSelectAllowance() {
    await this.safeClick(this.selectAllowance);
  }

  async clickDropdownAllowance() {
    await this.safeClick(this.dropdownAllowance);
  }

  async clickAddAllowance() {
    await this.safeClick(this.addAllowance);
  }

  async clickOpenAllowance() {
    await this.openAllowance.check();
  }

  async fillFillInsurance(insurance: string) {
    await this.safeFill(this.fillInsurance, insurance);
  }

  async clickSetSalary() {
    await this.safeClick(this.setSalary);
  }

  async fillFillSalary(salary: string) {
    await this.safeFill(this.fillSalary, salary);
  }

  async fillEmail(email: string) {
    await this.safeFill(this.email, email);
  }

  async clickDropdownEmployeeType() {
    await this.safeClick(this.dropdownEmployeeType);
  }

  async clickStaff() {
    await this.safeClick(this.selectStaff);
  }

  async clickDropdownDepartment() {
    await this.safeClick(this.dropdownDepartment);
  }

  async clickSelectDepartment() {
    await this.safeClick(this.selectDepartment);
  }

  async fillEmployeeName(name: string) {
    await this.employeeName.clear();
    await this.safeFill(this.employeeName, name);
  }

  async fillEmployeeCode(code: string) {
    await this.safeFill(this.employeeCode, code);
  }

  async clickUser() {
    await this.safeClick(this.userButton);
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

  async verifyEmailError() {
    await this.safeVerifyToHaveText(this.emailError, "Định dạng Địa chỉ email không hợp lệ.");
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
    await this.clickSelectDepartment();
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
    await this.verifyEmailError();
    await this.toastPage.getToastAddFailed();
  }

  async testMinlengthEmail() {
    await this.testAddEmployee();
    await this.fillEmail('minh');
    await this.clickSave();
    await this.expectValidateMinLengthEmail();
    await this.toastPage.getToastAddFailed();
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
    await this.clickSelectDepartment();
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
    await this.selectMaleSearch();
    await this.clickSearch();
    await this.verifyVerifyMaleSearch();
    await this.clickClearSearch();

    await this.clickDropdownGenderSearch();
    await this.selectFemaleSearch();
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
    await this.clickCitizenIdCardIssueDate();
    await this.clicktodayDatePicker();

    await this.fillPlaceOfIssueOfIdentityCard('Bien Hoa, Dong Nai');
    await this.fillBankName('Vietcombank');
    await this.fillBankAccountNumber('02847182497124');
    await this.fillPhoneNumber(phoneNumber);
    await this.fillAddress('Bien Hoa, Dong Nai');
    await this.fillNote('Automation testing');
    await this.clickDateOfBirth();
    await this.clickChosseYear();
    await this.clickSelectYear();
    await this.clickChosseMonth();
    await this.clickSelectMonth();
    await this.clickSelectDay();
    await this.clickDateOfJoiningTheCompany();
    await this.clicktodayDatePicker();
  }

  async testSetSalary() {
    await this.clickSetSalary();
    await this.fillFillSalary('22000000');
    await this.fillFillInsurance('500000');
    await this.clickOpenAllowance();
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
