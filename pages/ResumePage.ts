import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ResumePage extends BasePage {
    readonly resumeButton: Locator;
    readonly identifier: Locator;
    readonly aliasName: Locator;
    readonly placeOfBirth: Locator;
    readonly homeTown: Locator;
    readonly currentResidence: Locator;
    readonly permanentResidence: Locator;
    readonly homePhoneNumber: Locator;
    readonly officePhoneNumber: Locator;
    readonly nationPeople: Locator;
    readonly religion: Locator;
    readonly nationality: Locator;
    readonly maritalStatus: Locator;
    readonly educationalLevel: Locator;
    readonly professionalQualifications: Locator;
    readonly major: Locator;
    readonly politicalTheory: Locator;
    readonly stateManagement: Locator;
    readonly passportNumber: Locator;
    readonly wherePassportsAreIssued: Locator;
    readonly passportIssuanceDate: Locator;
    readonly passportExpirationDate: Locator;
    readonly insuranceNumber: Locator;
    readonly socialSecurityNumber: Locator;
    readonly height: Locator;
    readonly weight: Locator;
    readonly healthStatus: Locator;
    readonly bloodType: Locator;
    readonly currentJob: Locator;
    readonly preRecruitment: Locator;
    readonly recruimentDate: Locator;
    readonly organizationJoined: Locator;
    readonly startWorkingDate: Locator;
    readonly contractSignDate: Locator;
    readonly recruimentForm: Locator;
    readonly recruitedPosition: Locator;
    readonly politicalTheoryInput: Locator;
    readonly msgPlaceOfBirthRequired: Locator;
    readonly msgHownTownRequired: Locator;
    readonly msgEthnicityRequired: Locator;
    readonly msgReligionRequired: Locator;

    constructor(page: Page) {
        super(page);
        this.msgReligionRequired = page.locator("//div[contains(text(),'Nhập tôn giáo')]");
        this.msgEthnicityRequired = page.locator("//div[contains(text(),'Nhập dân tộc')]");
        this.msgHownTownRequired = page.locator("//div[contains(text(),'Nhập quê quán')]");
        this.msgPlaceOfBirthRequired = page.locator("//div[contains(text(),'Nhập nơi sinh')]");
        this.politicalTheoryInput = page.getByRole('textbox', { name: 'Lý luận chính trị' })
        this.recruitedPosition = page.getByRole('textbox', { name: 'Chức danh tuyển dụng' })
        this.recruimentForm = page.getByRole('textbox', { name: 'Hình thức tuyển dụng' })
        this.contractSignDate = page.getByRole('textbox', { name: 'Ngày ký hợp đồng' })
        this.startWorkingDate = page.getByRole('textbox', { name: 'Ngày bắt đầu làm việc' })
        this.organizationJoined = page.getByRole('textbox', { name: 'Tổ chức đã vào' })
        this.recruimentDate = page.getByRole('textbox', { name: 'Ngày tuyển dụng' })
        this.preRecruitment = page.getByRole('textbox', { name: 'Nghề nghiệp trước tuyển dụng' });
        this.currentJob = page.getByRole('textbox', { name: 'Công việc hiện tại' });
        this.bloodType = page.getByRole('textbox', { name: 'Nhóm máu' })
        this.healthStatus = page.getByRole('textbox', { name: 'Tình trạng sức khỏe' })
        this.weight = page.getByRole('spinbutton', { name: 'Cân nặng' })
        this.height = page.getByRole('spinbutton', { name: 'Chiều cao' })
        this.socialSecurityNumber = page.getByRole('textbox', { name: 'Số BHXH' })
        this.insuranceNumber = page.getByRole('textbox', { name: 'Số bảo hiểm' })
        this.passportIssuanceDate = page.getByRole('textbox', { name: 'Ngày cấp hộ chiếu' })
        this.passportExpirationDate = page.getByRole('textbox', { name: 'Ngày hết hạn hộ chiếu' })
        this.wherePassportsAreIssued = page.getByRole('textbox', { name: 'Nơi cấp hộ chiếu' })
        this.passportNumber = page.getByRole('textbox', { name: 'Số hộ chiếu' })
        this.stateManagement = page.getByRole('textbox', { name: 'Quản lý nhà nước' })
        this.major = page.locator("//div[1]/div/div[2]/div/div[25]/div/div/div/div[3]/div/input");
        this.professionalQualifications = page.getByRole('textbox', { name: 'Trình độ chuyên môn' })
        this.maritalStatus = page.getByRole('textbox', { name: 'Tình trạng hôn nhân' })
        this.educationalLevel = page.getByRole('textbox', { name: 'Trình độ học vấn' })
        this.religion = page.getByRole('textbox', { name: 'Tôn giáo ※' })
        this.nationality = page.getByRole('textbox', { name: 'Quốc tịch' })
        this.nationPeople = page.getByRole('textbox', { name: 'Dân tộc ※' })
        this.officePhoneNumber = page.getByRole('spinbutton', { name: 'SĐT cơ quan' })
        this.homePhoneNumber = page.getByRole('spinbutton', { name: 'SĐT nhà riêng' })
        this.permanentResidence = page.getByRole('textbox', { name: 'Hộ khẩu thường trú' })
        this.currentResidence = page.getByRole('textbox', { name: 'Nơi ở hiện tại' })
        this.homeTown = page.getByRole('textbox', { name: 'Quê quán ※' })
        this.placeOfBirth = page.getByRole('textbox', { name: 'Nơi sinh ※' })
        this.aliasName = page.getByRole('textbox', { name: 'Tên gọi khác' })
        this.identifier = page.getByRole('spinbutton', { name: 'Mã định danh' })
        this.resumeButton = page.locator("//span[contains(.,'Sơ yếu lý lịch')]");
    }
    // VERIFY REQUIRED MESSAGE
    async verifyMsgPlaceOfBirthRequired() {
        await this.safeVerifyToHaveText(this.msgPlaceOfBirthRequired, 'Nhập nơi sinh');
    }

    async verifyMsgHownTownRequired() {
        await this.safeVerifyToHaveText(this.msgHownTownRequired, 'Nhập quê quán');
    }

    async verifyMsgEthnicityRequired() {
        await this.safeVerifyToHaveText(this.msgEthnicityRequired, 'Nhập dân tộc');
    }

    async verifyMsgReligionRequired() {
        await this.safeVerifyToHaveText(this.msgReligionRequired, 'Nhập tôn giáo');
    }

    // CLICK ACTIONS
    async clickContractSignDate() {
        await this.safeClick(this.contractSignDate);
    }

    async clickRecruitmentDate() {
        await this.safeClick(this.recruimentDate);
    }

    async clickStartWorkingDate() {
        await this.safeClick(this.startWorkingDate);
    }

    async clickPassportIssuanceDate() {
        await this.safeClick(this.passportIssuanceDate);
    }

    async clickPassportExpirationDate() {
        await this.safeClick(this.passportExpirationDate);
    }

    async clickResume() {
        await this.safeClick(this.resumeButton);
    }

    // FILL FIELDS
    async fillPoliticalTheory(text: string) {
        await this.safeFill(this.politicalTheoryInput, text);
    }

    async fillRecruitedPosition(text: string) {
        await this.safeFill(this.recruitedPosition, text);
    }

    async fillRecruimentForm(text: string) {
        await this.safeFill(this.recruimentForm, text);
    }

    async fillOrganizationJoined(text: string) {
        await this.safeFill(this.organizationJoined, text);
    }

    async fillPreRecruitment(text: string) {
        await this.safeFill(this.preRecruitment, text);
    }

    async fillCurrentJob(text: string) {
        await this.safeFill(this.currentJob, text);
    }

    async fillBloodType(text: string) {
        await this.safeFill(this.bloodType, text);
    }

    async fillHealthStatus(text: string) {
        await this.safeFill(this.healthStatus, text);
    }

    async fillWeight(text: string) {
        await this.safeFill(this.weight, text);
    }

    async fillHeight(text: string) {
        await this.safeFill(this.height, text);
    }

    async fillInsuranceNumber(text: string) {
        await this.safeFill(this.insuranceNumber, text);
    }

    async fillSocialSecurityNumber(text: string) {
        await this.safeFill(this.socialSecurityNumber, text);
    }

    async fillWherePassportsAreIssued(text: string) {
        await this.safeFill(this.wherePassportsAreIssued, text);
    }

    async fillPassportNumber(text: string) {
        await this.safeFill(this.passportNumber, text);
    }

    async fillStateManagement(text: string) {
        await this.safeFill(this.stateManagement, text);
    }

    async fillMajor(text: string) {
        await this.safeFill(this.major, text);
    }

    async fillProfessionalQualifications(text: string) {
        await this.safeFill(this.professionalQualifications, text);
    }

    async fillNationPeople(text: string) {
        await this.safeFill(this.nationPeople, text);
    }

    async fillReligion(text: string) {
        await this.safeFill(this.religion, text);
    }

    async fillNationality(text: string) {
        await this.safeFill(this.nationality, text);
    }

    async fillMaritalStatus(text: string) {
        await this.safeFill(this.maritalStatus, text);
    }

    async fillEducationalLevel(text: string) {
        await this.safeFill(this.educationalLevel, text);
    }

    async fillHomePhoneNumber(text: string) {
        await this.safeFill(this.homePhoneNumber, text);
    }

    async fillOfficePhoneNumber(text: string) {
        await this.safeFill(this.officePhoneNumber, text);
    }

    async fillPermanentResidence(text: string) {
        await this.safeFill(this.permanentResidence, text);
    }

    async fillCurrentResidence(text: string) {
        await this.safeFill(this.currentResidence, text);
    }

    async fillHomeTown(text: string) {
        await this.safeFill(this.homeTown, text);
    }

    async fillPlaceOfBirth(text: string) {
        await this.safeFill(this.placeOfBirth, text);
    }

    async fillAliasName(text: string) {
        await this.safeFill(this.aliasName, text);
    }

    async fillIdentifier(text: string) {
        await this.safeFill(this.identifier, text);
    }

    // ACTION COMBO
    async testSaveWithEmptyFieldsRequired() {
        await this.clickResume();
        await this.clickEdit();
    }

    async testResumeWithValidData() {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const random10Digits = Math.floor(1000000000 + Math.random() * 9000000000);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await this.clickResume();
        await this.clickEdit();
        await this.fillAliasName("Nguyễn Văn B");
        await this.fillPlaceOfBirth("Hà Nội");
        await this.fillHomeTown("Hà Nội");
        await this.fillPermanentResidence("Hà Nội");
        await this.fillHomePhoneNumber(phoneNumber);
        await this.fillOfficePhoneNumber(phoneNumber);
        await this.fillNationPeople("Kinh");
        await this.fillReligion("Không");
        await this.fillNationality("Việt Nam");
        await this.fillMaritalStatus("Độc thân");
        await this.fillEducationalLevel("Cao đẳng");
        await this.fillProfessionalQualifications("Công nghệ thông tin");
        await this.fillMajor("Công nghệ thông tin");
        await this.fillPoliticalTheory("Không");
        await this.fillStateManagement("Công ty BigAppTech");
        await this.fillPassportNumber(random10Digits.toString());
        await this.fillWherePassportsAreIssued("Hà Nội");
        await this.clickPassportIssuanceDate();
        await this.clicktodayDatePicker();
        await this.clickPassportExpirationDate();
        await this.clicktodayDatePicker();
        await this.fillSocialSecurityNumber(random10Digits.toString());
        await this.fillInsuranceNumber(random10Digits.toString());
        await this.fillHeight("170");
        await this.fillWeight("60");
        await this.fillHealthStatus("Khỏe mạnh");
        await this.fillBloodType("A");
        await this.fillCurrentJob("Công nghệ thông tin");
        await this.fillPreRecruitment("Công nghệ thông tin");
        await this.fillOrganizationJoined("Testing");
        await this.fillRecruimentForm("Testing");
        await this.fillRecruitedPosition("Công nghệ thông tin");
        await this.clickStartWorkingDate();
        await this.clicktodayDatePicker();
        await this.clickRecruitmentDate();
        await this.clicktodayDatePicker();
        await this.clickContractSignDate();
        await this.clicktodayDatePicker();
    }
}
