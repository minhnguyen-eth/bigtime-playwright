import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ResumePage extends BasePage {
    readonly RESUME_BUTTON: Locator;
    readonly IDENTIFIER: Locator;
    readonly ALIAS_NAME: Locator;
    readonly PLACE_OF_BIRTH: Locator;
    readonly HOME_TOWN: Locator;
    readonly CURRENT_RESIDENCE: Locator;
    readonly PERMANENT_RESIDENCE: Locator;
    readonly HOME_PHONE_NUMBER: Locator;
    readonly OFFICE_PHONE_NUMBER: Locator;
    readonly NATION_PEOPLE: Locator;
    readonly RELIGION: Locator;
    readonly NATIONALITY: Locator;
    readonly MARITAL_STATUS: Locator;
    readonly EDUCATIONAL_LEVEL: Locator;
    readonly PROFESSIONAL_QUALIFICATIONS: Locator;
    readonly MAJOR: Locator;
    readonly STATE_MANAGEMENT: Locator;
    readonly PASSPORT_NUMBER: Locator;
    readonly WHERE_PASSPORTS_ARE_ISSUED: Locator;
    readonly PASSPORT_ISSUANCE_DATE: Locator;
    readonly PASSPORT_EXPIRATION_DATE: Locator;
    readonly INSURANCE_NUMBER: Locator;
    readonly SOCIAL_SECURITY_NUMBER: Locator;
    readonly HEIGHT: Locator;
    readonly WEIGHT: Locator;
    readonly HEALTH_STATUS: Locator;
    readonly BLOOD_TYPE: Locator;
    readonly CURRENT_JOB: Locator;
    readonly PRE_RECRUITMENT: Locator;
    readonly RECRUITMENT_DATE: Locator;
    readonly ORGANIZATION_JOINED: Locator;
    readonly START_WORKING_DATE: Locator;
    readonly CONTRACT_SIGN_DATE: Locator;
    readonly RECRUITMENT_FORM: Locator;
    readonly RECRUITED_POSITION: Locator;
    readonly POLITICAL_THEORY_INPUT: Locator;
    readonly MSG_PLACE_OF_BIRTH_REQUIRED: Locator;
    readonly MSG_HOME_TOWN_REQUIRED: Locator;
    readonly MSG_ETHNICITY_REQUIRED: Locator;
    readonly MSG_RELIGION_REQUIRED: Locator;

    constructor(page: Page) {
        super(page);
        this.MSG_RELIGION_REQUIRED = page.locator("//div[contains(text(),'Nhập tôn giáo')]");
        this.MSG_ETHNICITY_REQUIRED = page.locator("//div[contains(text(),'Nhập dân tộc')]");
        this.MSG_HOME_TOWN_REQUIRED = page.locator("//div[contains(text(),'Nhập quê quán')]");
        this.MSG_PLACE_OF_BIRTH_REQUIRED = page.locator("//div[contains(text(),'Nhập nơi sinh')]");
        this.POLITICAL_THEORY_INPUT = page.getByRole('textbox', { name: 'Lý luận chính trị' });
        this.RECRUITED_POSITION = page.getByRole('textbox', { name: 'Chức danh tuyển dụng' });
        this.RECRUITMENT_FORM = page.getByRole('textbox', { name: 'Hình thức tuyển dụng' });
        this.CONTRACT_SIGN_DATE = page.getByRole('textbox', { name: 'Ngày ký hợp đồng' });
        this.START_WORKING_DATE = page.getByRole('textbox', { name: 'Ngày bắt đầu làm việc' });
        this.ORGANIZATION_JOINED = page.getByRole('textbox', { name: 'Tổ chức đã vào' });
        this.RECRUITMENT_DATE = page.getByRole('textbox', { name: 'Ngày tuyển dụng' });
        this.PRE_RECRUITMENT = page.getByRole('textbox', { name: 'Nghề nghiệp trước tuyển dụng' });
        this.CURRENT_JOB = page.getByRole('textbox', { name: 'Công việc hiện tại' });
        this.BLOOD_TYPE = page.getByRole('textbox', { name: 'Nhóm máu' });
        this.HEALTH_STATUS = page.getByRole('textbox', { name: 'Tình trạng sức khỏe' });
        this.WEIGHT = page.getByRole('spinbutton', { name: 'Cân nặng' });
        this.HEIGHT = page.getByRole('spinbutton', { name: 'Chiều cao' });
        this.SOCIAL_SECURITY_NUMBER = page.getByRole('textbox', { name: 'Số BHXH' });
        this.INSURANCE_NUMBER = page.getByRole('textbox', { name: 'Số bảo hiểm' });
        this.PASSPORT_ISSUANCE_DATE = page.getByRole('textbox', { name: 'Ngày cấp hộ chiếu' });
        this.PASSPORT_EXPIRATION_DATE = page.getByRole('textbox', { name: 'Ngày hết hạn hộ chiếu' });
        this.WHERE_PASSPORTS_ARE_ISSUED = page.getByRole('textbox', { name: 'Nơi cấp hộ chiếu' });
        this.PASSPORT_NUMBER = page.getByRole('textbox', { name: 'Số hộ chiếu' });
        this.STATE_MANAGEMENT = page.getByRole('textbox', { name: 'Quản lý nhà nước' });
        this.MAJOR = page.getByRole('textbox', { name: 'Chuyên ngành' });
        this.PROFESSIONAL_QUALIFICATIONS = page.getByRole('textbox', { name: 'Trình độ chuyên môn' });
        this.MARITAL_STATUS = page.getByRole('textbox', { name: 'Tình trạng hôn nhân' });
        this.EDUCATIONAL_LEVEL = page.getByRole('textbox', { name: 'Trình độ học vấn' });
        this.RELIGION = page.getByRole('textbox', { name: 'Tôn giáo ※' });
        this.NATIONALITY = page.getByRole('textbox', { name: 'Quốc tịch' });
        this.NATION_PEOPLE = page.getByRole('textbox', { name: 'Dân tộc ※' });
        this.OFFICE_PHONE_NUMBER = page.getByRole('spinbutton', { name: 'SĐT cơ quan' });
        this.HOME_PHONE_NUMBER = page.getByRole('spinbutton', { name: 'SĐT nhà riêng' });
        this.PERMANENT_RESIDENCE = page.getByRole('textbox', { name: 'Hộ khẩu thường trú' });
        this.CURRENT_RESIDENCE = page.getByRole('textbox', { name: 'Nơi ở hiện tại' });
        this.HOME_TOWN = page.getByRole('textbox', { name: 'Quê quán ※' });
        this.PLACE_OF_BIRTH = page.getByRole('textbox', { name: 'Nơi sinh ※' });
        this.ALIAS_NAME = page.getByRole('textbox', { name: 'Tên gọi khác' });
        this.IDENTIFIER = page.getByRole('spinbutton', { name: 'Mã định danh' });
        this.RESUME_BUTTON = page.locator("//span[contains(.,'Sơ yếu lý lịch')]");
    }

    // VERIFY REQUIRED MESSAGE
    async verifyMsgPlaceOfBirthRequired() {
        await this.safeVerifyToHaveText(this.MSG_PLACE_OF_BIRTH_REQUIRED, 'Nhập nơi sinh');
    }

    async verifyMsgHomeTownRequired() {
        await this.safeVerifyToHaveText(this.MSG_HOME_TOWN_REQUIRED, 'Nhập quê quán');
    }

    async verifyMsgEthnicityRequired() {
        await this.safeVerifyToHaveText(this.MSG_ETHNICITY_REQUIRED, 'Nhập dân tộc');
    }

    async verifyMsgReligionRequired() {
        await this.safeVerifyToHaveText(this.MSG_RELIGION_REQUIRED, 'Nhập tôn giáo');
    }

    // CLICK ACTIONS
    async clickContractSignDate() {
        await this.safeClick(this.CONTRACT_SIGN_DATE);
    }

    async clickRecruitmentDate() {
        await this.safeClick(this.RECRUITMENT_DATE);
    }

    async clickStartWorkingDate() {
        await this.safeClick(this.START_WORKING_DATE);
    }

    async clickPassportIssuanceDate() {
        await this.safeClick(this.PASSPORT_ISSUANCE_DATE);
    }

    async clickPassportExpirationDate() {
        await this.safeClick(this.PASSPORT_EXPIRATION_DATE);
    }

    async clickResume() {
        await this.safeClick(this.RESUME_BUTTON);
    }

    // FILL FIELDS
    async fillPoliticalTheory(text: string) {
        await this.safeFill(this.POLITICAL_THEORY_INPUT, text);
    }

    async fillRecruitedPosition(text: string) {
        await this.safeFill(this.RECRUITED_POSITION, text);
    }

    async fillRecruitmentForm(text: string) {
        await this.safeFill(this.RECRUITMENT_FORM, text);
    }

    async fillOrganizationJoined(text: string) {
        await this.safeFill(this.ORGANIZATION_JOINED, text);
    }

    async fillPreRecruitment(text: string) {
        await this.safeFill(this.PRE_RECRUITMENT, text);
    }

    async fillCurrentJob(text: string) {
        await this.safeFill(this.CURRENT_JOB, text);
    }

    async fillBloodType(text: string) {
        await this.safeFill(this.BLOOD_TYPE, text);
    }

    async fillHealthStatus(text: string) {
        await this.safeFill(this.HEALTH_STATUS, text);
    }

    async fillWeight(text: string) {
        await this.safeFill(this.WEIGHT, text);
    }

    async fillHeight(text: string) {
        await this.safeFill(this.HEIGHT, text);
    }

    async fillInsuranceNumber(text: string) {
        await this.safeFill(this.INSURANCE_NUMBER, text);
    }

    async fillSocialSecurityNumber(text: string) {
        await this.safeFill(this.SOCIAL_SECURITY_NUMBER, text);
    }

    async fillWherePassportsAreIssued(text: string) {
        await this.safeFill(this.WHERE_PASSPORTS_ARE_ISSUED, text);
    }

    async fillPassportNumber(text: string) {
        await this.safeFill(this.PASSPORT_NUMBER, text);
    }

    async fillStateManagement(text: string) {
        await this.safeFill(this.STATE_MANAGEMENT, text);
    }

    async fillMajor(text: string) {
        await this.safeFill(this.MAJOR, text);
    }

    async fillProfessionalQualifications(text: string) {
        await this.safeFill(this.PROFESSIONAL_QUALIFICATIONS, text);
    }

    async fillNationPeople(text: string) {
        await this.safeFill(this.NATION_PEOPLE, text);
    }

    async fillReligion(text: string) {
        await this.safeFill(this.RELIGION, text);
    }

    async fillNationality(text: string) {
        await this.safeFill(this.NATIONALITY, text);
    }

    async fillMaritalStatus(text: string) {
        await this.safeFill(this.MARITAL_STATUS, text);
    }

    async fillEducationalLevel(text: string) {
        await this.safeFill(this.EDUCATIONAL_LEVEL, text);
    }

    async fillHomePhoneNumber(text: string) {
        await this.safeFill(this.HOME_PHONE_NUMBER, text);
    }

    async fillOfficePhoneNumber(text: string) {
        await this.safeFill(this.OFFICE_PHONE_NUMBER, text);
    }

    async fillPermanentResidence(text: string) {
        await this.safeFill(this.PERMANENT_RESIDENCE, text);
    }

    async fillCurrentResidence(text: string) {
        await this.safeFill(this.CURRENT_RESIDENCE, text);
    }

    async fillHomeTown(text: string) {
        await this.safeFill(this.HOME_TOWN, text);
    }

    async fillPlaceOfBirth(text: string) {
        await this.safeFill(this.PLACE_OF_BIRTH, text);
    }

    async fillAliasName(text: string) {
        await this.safeFill(this.ALIAS_NAME, text);
    }

    async fillIdentifier(text: string) {
        await this.safeFill(this.IDENTIFIER, text);
    }

    // ACTION COMBO
    async testSaveWithEmptyFieldsRequired() {
        await this.clickResume();
        await this.clickEditNth1();
    }

    async testResumeWithValidData() {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const random10Digits = Math.floor(1000000000 + Math.random() * 9000000000);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await this.clickResume();
        await this.clickEditNth1();
        await this.fillAliasName("Nguyễn Văn B");
        await this.fillPlaceOfBirth("Hà Nội");
        await this.fillHomeTown("Hà Nội");
        await this.fillPermanentResidence("Hà Nội");
        // await this.fillHomePhoneNumber(phoneNumber);
        // await this.fillOfficePhoneNumber(phoneNumber);
        await this.fillNationPeople("Kinh");
        await this.fillReligion("Không");
        // await this.fillNationality("Việt Nam");
        // await this.fillMaritalStatus("Độc thân");
        await this.fillEducationalLevel("Cao đẳng");
        await this.fillProfessionalQualifications("Công nghệ thông tin");
        await this.fillMajor("Công nghệ thông tin");
        // await this.fillPoliticalTheory("Không");
        // await this.fillStateManagement("Công ty BigAppTech");
        // await this.fillPassportNumber(random10Digits.toString());
        // await this.fillWherePassportsAreIssued("Hà Nội");
        // await this.clickPassportIssuanceDate();
        // await this.clickTodayDatePicker();
        // await this.clickPassportExpirationDate();
        // await this.clickTodayDatePicker();
        await this.fillSocialSecurityNumber(random10Digits.toString());
        await this.fillInsuranceNumber(random10Digits.toString());
        // await this.fillHeight("170");
        // await this.fillWeight("60");
        // await this.fillHealthStatus("Khỏe mạnh");
        // await this.fillBloodType("A");
        // await this.fillCurrentJob("Công nghệ thông tin");
        // await this.fillPreRecruitment("Công nghệ thông tin");
        // await this.fillOrganizationJoined("Testing");
        // await this.fillRecruitmentForm("Testing");
        // await this.fillRecruitedPosition("Công nghệ thông tin");
        await this.clickStartWorkingDate();
        await this.clickChoose();
        // await this.clickRecruitmentDate();
        // await this.clickTodayDatePicker();
        await this.clickContractSignDate();
        await this.clickChoose();
    }
}