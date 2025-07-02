import { expect, Locator, Page } from '@playwright/test';

export class ResumePage {
    readonly page: Page;
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
    readonly toDayDatePicker: Locator;
    readonly chosseButton: Locator;
    readonly editButton: Locator;
    readonly politicalTheoryInput: Locator;
    readonly msgPlaceOfBirthRequired: Locator;
    readonly msgHownTownRequired: Locator;
    readonly msgEthnicityRequired: Locator;
    readonly msgReligionRequired: Locator;

    constructor(page: Page) {
        this.page = page;
        this.msgReligionRequired = page.locator("//div[contains(text(),'Nhập tôn giáo')]");
        this.msgEthnicityRequired = page.locator("//div[contains(text(),'Nhập dân tộc')]");
        this.msgHownTownRequired = page.locator("//div[contains(text(),'Nhập quê quán')]");
        this.msgPlaceOfBirthRequired = page.locator("//div[contains(text(),'Nhập nơi sinh')]");
        this.politicalTheoryInput = page.locator("//div[1]/div/div[2]/div/div[26]/div/div/div/div[3]/div/input");
        this.editButton = page.locator("//span[contains(text(),'Sửa')]");
        this.chosseButton = page.locator("//button[contains(text(),'Chọn')]");
        this.toDayDatePicker = page.locator("//div[@class='dp__cell_inner dp__pointer dp__today dp__date_hover']");
        this.recruitedPosition = page.locator("//div[2]/div/div[2]/div/div[24]/div/div/div/div[3]/div/input");
        this.recruimentForm = page.locator("//div[2]/div/div[2]/div/div[23]/div/div/div/div[3]/div/input");
        this.contractSignDate = page.locator("//div[2]/div/div[22]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.startWorkingDate = page.locator("//div[2]/div/div[21]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.organizationJoined = page.locator("//div[2]/div/div[2]/div/div[20]/div/div/div/div[3]/div/input");
        this.recruimentDate = page.locator("//div[2]/div/div[19]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.preRecruitment = page.locator("//div[2]/div/div[2]/div/div[18]/div/div/div/div[3]/div/input");
        this.currentJob = page.locator("//div[2]/div/div[17]/div/div/div/div[3]/div/input");
        this.bloodType = page.locator("//div[2]/div/div[2]/div/div[15]/div/div/div/div[3]/div/input");
        this.healthStatus = page.locator("//div[2]/div/div[2]/div/div[13]/div/div/div/div[3]/div/input");
        this.weight = page.locator("//div[2]/div/div[2]/div/div[14]/div/div/div/div[3]/div/input");
        this.height = page.locator("//div[2]/div/div[12]/div/div/div/div[3]/div/input");
        this.socialSecurityNumber = page.locator("//div[2]/div/div[2]/div/div[11]/div/div/div/div[3]/div/input");
        this.insuranceNumber = page.locator("//div[2]/div/div[2]/div/div[10]/div/div/div/div[3]/div/input");
        this.passportIssuanceDate = page.locator("//div[2]/div/div[7]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.passportExpirationDate = page.locator("//div[2]/div/div[8]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.wherePassportsAreIssued = page.locator("//div[2]/div/div[6]/div/div/div/div[3]/div/input");
        this.passportNumber = page.locator("//div[2]/div/div[2]/div/div[5]/div/div/div/div[3]/div/input");
        this.stateManagement = page.locator("//div[1]/div/div[2]/div/div[27]/div/div/div/div[3]/div/input");
        this.major = page.locator("//div[1]/div/div[2]/div/div[25]/div/div/div/div[3]/div/input");
        this.professionalQualifications = page.locator("//div[1]/div/div[2]/div/div[24]/div/div/div/div[3]/div/input");
        this.maritalStatus = page.locator("//div[1]/div/div[2]/div/div[21]/div/div/div/div[3]/div/input");
        this.educationalLevel = page.locator("//div[1]/div/div[2]/div/div[23]/div/div/div/div[3]/div/input");
        this.religion = page.locator("//div[1]/div/div[2]/div/div[19]/div/div/div/div[3]/div/input");
        this.nationality = page.locator("//div[1]/div/div[2]/div/div[20]/div/div/div/div[3]/div/input");
        this.nationPeople = page.locator("//div[1]/div/div[2]/div/div[18]/div/div/div/div[3]/div/input");
        this.officePhoneNumber = page.locator("//div/div[1]/div/div[2]/div/div[16]/div/div/div/div[3]/div/input");
        this.homePhoneNumber = page.locator("//div[1]/div/div[2]/div/div[14]/div/div/div/div[3]/div/input");
        this.permanentResidence = page.locator("//div[1]/div/div[2]/div/div[11]/div/div/div/div[3]/div/input");
        this.currentResidence = page.locator("//div[1]/div/div[2]/div/div[10]/div/div/div/div[3]/div/input");
        this.homeTown = page.locator("//div[1]/div/div[2]/div/div[9]/div/div/div/div[3]/div/input");
        this.placeOfBirth = page.locator("//div[1]/div/div[2]/div/div[7]/div/div[1]/div/div[3]/div/input");
        this.aliasName = page.locator("//div[1]/div/div[2]/div/div[4]/div/div/div/div[3]/div/input");
        this.identifier = page.locator("//div[1]/div/div[2]/div/div[2]/div/div/div/div[3]/div/input");
        this.resumeButton = page.locator("//span[contains(.,'Sơ yếu lý lịch')]");
    }

    async verifyMsgPlaceOfBirthRequired() {
        await expect(this.msgPlaceOfBirthRequired).toBeVisible();
        await expect(this.msgPlaceOfBirthRequired).toHaveText('Nhập nơi sinh');
    }
    async verifyMsgHownTownRequired() {
        await expect(this.msgHownTownRequired).toBeVisible();
        await expect(this.msgHownTownRequired).toHaveText('Nhập quê quán');
    }
    async verifyMsgEthnicityRequired() {
        await expect(this.msgEthnicityRequired).toBeVisible();
        await expect(this.msgEthnicityRequired).toHaveText('Nhập dân tộc');
    }
    async verifyMsgReligionRequired() {
        await expect(this.msgReligionRequired).toBeVisible();
        await expect(this.msgReligionRequired).toHaveText('Nhập tôn giáo');
    }

    async clickEditButton() {
        await this.editButton.nth(1).click();
    }

    async clickToDayDatePicker() {
        await this.toDayDatePicker.click();
    }
    async clickChosseButton() {
        await this.chosseButton.click();
    }

    async clickContractSignDate() {
        await this.contractSignDate.click();
    }

    async clickRecruitmentDate() {
        await this.recruimentDate.click();
    }

    async clickStartWorkingDate() {
        await this.startWorkingDate.click();
    }

    async fillPoliticalTheory(politicaltheory: string) {
        await this.politicalTheoryInput.fill(politicaltheory);
    }

    async fillRecruitedPosition(position: string) {
        await this.recruitedPosition.fill(position);
    }
    async fillRecruimentForm(form: string) {
        await this.recruimentForm.fill(form);
    }
    async fillOrganizationJoined(joinedorganization: string) {
        await this.organizationJoined.fill(joinedorganization);
    }
    async fillPreRecruitment(preRecruitment: string) {
        await this.preRecruitment.fill(preRecruitment);
    }
    async fillCurrentJob(job: string) {
        await this.currentJob.fill(job);
    }
    async fillBloodType(bloodtype: string) {
        await this.bloodType.fill(bloodtype);
    }
    async fillHealthStatus(healthstatus: string) {
        await this.healthStatus.fill(healthstatus);
    }
    async fillWeight(weight: string) {
        await this.weight.fill(weight);
    }
    async fillHeight(height: string) {
        await this.height.fill(height);
    }

    async fillInsuranceNumber(insurancenumber: string) {
        await this.insuranceNumber.fill(insurancenumber);
    }
    async fillSocialSecurityNumber(socialsecuritynumber: string) {
        await this.socialSecurityNumber.fill(socialsecuritynumber);
    }
    async clickPassportIssuanceDate() {
        await this.passportIssuanceDate.click();
    }

    async clickPassportExpirationDate() {
        await this.passportExpirationDate.click();
    }

    async fillWherePassportsAreIssued(issued: string) {
        await this.wherePassportsAreIssued.fill(issued);
    }

    async fillPassportNumber(passportnumber: string) {
        await this.passportNumber.fill(passportnumber);
    }
    async fillStateManagement(state: string) {
        await this.stateManagement.fill(state);
    }

    async fillMajor(major: string) {
        await this.major.fill(major);
    }

    async fillProfessionalQualifications(professionalqualifications: string) {
        await this.professionalQualifications.fill(professionalqualifications);
    }

    async fillNationPeople(nationpeople: string) {
        await this.nationPeople.fill(nationpeople);
    }

    async fillReligion(religion: string) {
        await this.religion.fill(religion);
    }

    async fillNationality(nationality: string) {
        await this.nationality.fill(nationality);
    }

    async fillMaritalStatus(status: string) {
        await this.maritalStatus.fill(status);
    }

    async fillEducationalLevel(level: string) {
        await this.educationalLevel.fill(level);
    }

    async fillHomePhoneNumber(homephoneNumber: string) {
        await this.homePhoneNumber.fill(homephoneNumber);
    }

    async fillOfficePhoneNumber(officenumber: string) {
        await this.officePhoneNumber.fill(officenumber);
    }

    async fillPermanentResidence(permanentresidence: string) {
        await this.permanentResidence.fill(permanentresidence);
    }

    async fillCurrentResidence(currentresidence: string) {
        await this.currentResidence.fill(currentresidence);
    }

    async fillHomeTown(hometown: string) {
        await this.homeTown.fill(hometown);
    }

    async fillPlaceOfBirth(placeofbirth: string) {
        await this.placeOfBirth.fill(placeofbirth);
    }

    async fillAliasName(aliasName: string) {
        await this.aliasName.fill(aliasName);
    }

    async fillIdentifier(identifier: string) {
        await this.identifier.fill(identifier);
    }

    async clickResume() {
        await this.resumeButton.click();
    }

    async testSaveWithEmptyFieldsRequired() {
        await this.clickResume();
        await this.clickEditButton();
    }

    async testResumeWithValidData() {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const randomAllowanceName = `Phụ cấp${randomSuffix}`;
        const userCode = `userCode${randomSuffix}`;
        const emailRandom = `email${randomSuffix}`;
        const random10Digits = Math.floor(1000000000 + Math.random() * 9000000000);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;

        await this.clickResume();
        await this.clickEditButton();
        await this.fillAliasName("Nguyễn Văn B");
        await this.fillPlaceOfBirth("Hà Nội");
        await this.fillHomeTown("Hà Nội");
        // await this.fillCurrentResidence("Hà Nội");
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
        await this.clickToDayDatePicker();
        await this.clickChosseButton();

        await this.clickPassportExpirationDate();
        await this.clickToDayDatePicker();
        await this.clickChosseButton();
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
        await this.clickToDayDatePicker();
        await this.clickChosseButton();
        await this.clickRecruitmentDate();
        await this.clickToDayDatePicker();
        await this.clickChosseButton();
        await this.clickContractSignDate();
        await this.clickToDayDatePicker();
        await this.clickChosseButton();
    }

}

