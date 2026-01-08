# 📚 BigTime Automation Testing - Hướng Dẫn Sử Dụng

## 📖 Mục Lục
- [Giới Thiệu](#giới-thiệu)
- [Cài Đặt](#cài-đặt)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Cấu Hình](#cấu-hình)
- [Chạy Tests](#chạy-tests)
- [Viết Tests](#viết-tests)
- [API Testing](#api-testing)
- [UI Testing](#ui-testing)
- [Hybrid Testing](#hybrid-testing)
- [Database Testing](#database-testing)
- [Allure Report](#allure-report)
- [CI/CD với GitHub Actions](#cicd-với-github-actions)
- [Best Practices](#best-practices)

---

## 🎯 Giới Thiệu

**BigTime Automation Testing** là dự án kiểm thử tự động cho hệ thống quản lý nhân sự, chấm công và tính lương BigTime.

### Tech Stack
- **Framework**: Playwright với TypeScript
- **Design Pattern**: Page Object Model (POM)
- **Reporting**: Allure Report
- **Database**: MySQL2
- **CI/CD**: GitHub Actions
- **Package Manager**: npm

### Tính Năng Chính
✅ API Testing với BaseAPI pattern
✅ UI Testing với Page Object Model
✅ Hybrid Testing (kết hợp API + UI + Database)
✅ Database Testing với MySQL
✅ Allure Report tích hợp
✅ Screenshot tự động khi test fail
✅ CI/CD tự động với GitHub Actions
✅ Deploy report lên GitHub Pages

---

## 🚀 Cài Đặt

### Yêu Cầu Hệ Thống
- Node.js >= 18.x
- npm >= 9.x
- MySQL >= 8.x (nếu chạy database tests)

### Bước 1: Clone Repository
```bash
git clone https://github.com/minhnguyen-eth/bigtime-playwright.git
cd bigtime-playwright
```

### Bước 2: Cài Đặt Dependencies
```bash
npm install
```

### Bước 3: Cài Đặt Playwright Browsers
```bash
npx playwright install
```

### Bước 4: Cấu Hình Environment Variables
Tạo file `.env` ở thư mục root:
```env
# Base URL
BASE_URL=https://bigtime-pre.bigapptech.vn

# Admin Account
ADMIN_USERNAME=admin@gmail.com
ADMIN_PASSWORD=your_password

# Manager Department Account
MANAGER_DEPARTMENT_USERNAME=admindepartment@gmail.com
MANAGER_DEPARTMENT_PASSWORD=your_password

# Manager Team Account
MANAGER_TEAM_USERNAME=managerteam@gmail.com
MANAGER_TEAM_PASSWORD=your_password

# Employee Accounts
EMPLOYEE_USERNAME=employee@gmail.com
EMPLOYEE_PASSWORD=your_password
EMPLOYEE2_USERNAME=employee2@gmail.com
EMPLOYEE2_PASSWORD=your_password

# Database Configuration
DB_HOST=your_db_host
DB_PORT=3306
DB_NAME=bigtime_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
```

---

## 📁 Cấu Trúc Dự Án

```
bigtime-playwright/
├── 📂 api/                          # API Testing Layer
│   ├── base.api.ts                  # Base API class với HTTP methods
│   ├── api.client.ts                # API Client tổng hợp
│   ├── auth/                        # Authentication API
│   │   └── auth.api.ts
│   ├── paysheet/                    # Paysheet API
│   │   └── paysheet.api.ts
│   └── types/                       # TypeScript types
│       └── common.types.ts
│
├── 📂 pages/                        # Page Object Model
│   ├── BasePage.ts                  # Base Page với common locators
│   ├── SafeActions.ts               # Safe interaction methods
│   ├── LoginPage.ts                 # Login page
│   ├── ToastPage.ts                 # Toast message validation
│   ├── ValidationPage.ts            # Form validation
│   ├── salary_page/                 # Salary module pages
│   │   ├── PaysheetPage.ts
│   │   ├── PayslipPage.ts
│   │   ├── AllowancePage.ts
│   │   └── DebtPage.ts
│   ├── timekeeping_page/            # Timekeeping module pages
│   ├── contract_page/               # Contract module pages
│   ├── evaluation_page/             # Evaluation module pages
│   └── ...
│
├── 📂 tests/                        # Test Suites
│   ├── api/                         # API Tests
│   │   ├── api-test.ts              # API test fixtures
│   │   ├── auth.api.spec.ts
│   │   └── paysheet.api.spec.ts
│   ├── ui/                          # UI Tests
│   │   ├── base-test.ts             # UI test fixtures
│   │   ├── login.spec.ts
│   │   ├── branch.spec.ts
│   │   └── ...
│   └── hybrid/                      # Hybrid Tests (API + UI + DB)
│       ├── payroll/
│       │   └── salary-calculation.spec.ts
│       └── timekeeping/
│
├── 📂 db/                           # Database Layer
│   ├── core/                        # Core DB functions
│   │   ├── DBConnection.ts          # MySQL connection
│   │   └── DBUtils.ts               # Common DB utilities
│   ├── helpers/                     # DB Helpers
│   │   └── DBHelper.ts
│   └── modules/                     # DB modules per feature
│       ├── EmployeeDB.ts
│       ├── PaysheetDB.ts
│       └── ...
│
├── 📂 utils/                        # Utilities
│   ├── configUtils.ts               # Config management
│   ├── dateUtils.ts                 # Date utilities
│   ├── logger.ts                    # Logging
│   └── screenshotUtils.ts           # Screenshot on failure
│
├── 📂 test-data/                    # Test Data (CSV files)
│   ├── users.csv
│   ├── payrolls.csv
│   └── ...
│
├── 📂 .github/workflows/            # CI/CD
│   └── main.yml                     # GitHub Actions workflow
│
├── playwright.config.ts             # Playwright configuration
├── package.json                     # Dependencies & scripts
└── README.md                        # Project overview
```

---

## ⚙️ Cấu Hình

### Playwright Config (`playwright.config.ts`)

```typescript
export default defineConfig({
  testDir: './tests',              // Thư mục chứa tests
  fullyParallel: true,             // Chạy parallel
  forbidOnly: !!process.env.CI,   // Không cho .only() trên CI
  retries: 0,                      // Không retry
  workers: 1,                      // Chạy serial (1 worker)
  timeout: 120000,                 // Timeout 2 phút

  reporter: [
    ['list'],                      // Console reporter
    ['allure-playwright'],         // Allure reporter
    ['html', { open: 'never' }]    // HTML reporter
  ],

  use: {
    headless: isHeadless,          // Headless mode
    viewport: { width: 1920, height: 1080 },
    trace: 'on-first-retry',       // Trace khi retry
    screenshot: 'only-on-failure', // Screenshot khi fail
    actionTimeout: 45000,          // Action timeout 45s
  },
});
```

### Config Utils (`utils/configUtils.ts`)

Quản lý environment variables:
```typescript
export class Config {
  static get urlStaging(): string {
    return process.env.BASE_URL || '';
  }

  static get admin_username(): string {
    return process.env.ADMIN_USERNAME || '';
  }
  // ... các config khác
}
```

---

## 🏃 Chạy Tests

### NPM Scripts

```bash
# Xóa kết quả cũ và chạy tất cả tests
npm run test

# Chạy chỉ API tests
npm run test:api

# Chạy chỉ UI tests
npm run test:ui

# Chạy với browser hiển thị (headed mode)
npm run test:headed

# Chạy với debug mode
npm run test:debug

# Generate Allure report
npm run allure:generate

# Mở Allure report
npm run allure:open

# Deploy report lên GitHub Pages
npm run deploy

# Chạy test + generate + deploy
npm run report
```

### Playwright CLI Commands

```bash
# Chạy tất cả tests
npx playwright test

# Chạy một file test cụ thể
npx playwright test tests/api/auth.api.spec.ts

# Chạy một test case cụ thể (theo line number)
npx playwright test tests/api/auth.api.spec.ts:30

# Chạy tests theo project
npx playwright test --project=chromium

# Chạy với headed mode
npx playwright test --headed

# Chạy với debug mode
npx playwright test --debug

# Chạy với UI mode (interactive)
npx playwright test --ui

# Chạy tests có tag cụ thể
npx playwright test --grep @smoke

# Chạy tests theo pattern
npx playwright test tests/ui/

# Generate code (codegen)
npx playwright codegen https://bigtime-pre.bigapptech.vn
```

---

## ✍️ Viết Tests

### Test Structure

Mỗi test file nên tuân theo cấu trúc:

```typescript
import { test, expect } from './base-test';
import { allure } from 'allure-playwright';

test.describe('Feature Name', () => {
  test.beforeEach(async () => {
    allure.epic('Module Name');
    allure.feature('Feature Name');
  });

  test('Test case description', async ({ page }) => {
    allure.story('User story');
    allure.severity('critical'); // critical, blocker, normal, minor, trivial

    // Test steps
    await test.step('Step 1: Do something', async () => {
      // Implementation
    });

    // Assertions
    expect(result).toBe(expected);
  });
});
```

### Allure Annotations

```typescript
// Epic (Module level)
allure.epic('Salary Management');

// Feature (Feature level)
allure.feature('Paysheet');

// Story (User story)
allure.story('Create paysheet');

// Severity
allure.severity('critical'); // blocker, critical, normal, minor, trivial

// Tags
allure.tag('smoke');
allure.tag('regression');

// Owner
allure.owner('Minh Nguyen');

// Issue/Bug link
allure.issue('BUG-123', 'https://jira.example.com/BUG-123');

// Test case link
allure.tms('TC-456', 'https://testcase.example.com/TC-456');

// Attachment
allure.attachment('Request Body', JSON.stringify(data), 'application/json');
```

---

## 🔌 API Testing

### Cấu Trúc API Layer

#### 1. BaseAPI (`api/base.api.ts`)

Base class cung cấp HTTP methods:

```typescript
export class BaseAPI {
  // GET request
  async get<T>(endpoint: string, options?: {...}): Promise<T>

  // POST request
  async post<T>(endpoint: string, data?: any, options?: {...}): Promise<T>

  // PUT request
  async put<T>(endpoint: string, data?: any, options?: {...}): Promise<T>

  // DELETE request
  async delete<T>(endpoint: string, options?: {...}): Promise<T>
}
```

#### 2. API Client (`api/api.client.ts`)

Tổng hợp tất cả API modules:

```typescript
export class APIClient {
  public auth: AuthAPI;
  public paysheet: PaysheetAPI;

  constructor(requestContext: APIRequestContext, baseURL?: string) {
    this.auth = new AuthAPI(requestContext, baseURL);
    this.paysheet = new PaysheetAPI(requestContext, baseURL);
  }

  // Helper methods
  async login(username: string, password: string) {...}
  async logout() {...}
  setToken(token: string) {...}
}
```

#### 3. Feature API (`api/auth/auth.api.ts`)

API cho từng feature:

```typescript
export class AuthAPI extends BaseAPI {
  async login(username: string, password: string, remember: boolean = true) {
    return await this.post<LoginResponse>('/api/auth/login', {
      username,
      password,
      remember,
    });
  }

  async logout() {
    return await this.post<LogoutResponse>('/api/auth/logout');
  }
}
```

### Viết API Test

#### Test Fixtures (`tests/api/api-test.ts`)

```typescript
export const apiTest = base.extend<APITestFixtures>({
  // Generic API client (not authenticated)
  apiClient: async ({ request }, use) => {
    const client = new APIClient(request);
    await use(client);
    await client.dispose();
  },

  // Admin API client (authenticated)
  adminAPI: async ({}, use) => {
    const client = await createAdminAPIClient();
    await use(client);
    await client.dispose();
  },
});
```


#### API Test Example (`tests/api/auth.api.spec.ts`)

```typescript
import { apiTest as test, expect } from './api-test';
import { allure } from 'allure-playwright';
import Config from '../../utils/configUtils';

test.describe('Authentication API Tests', () => {
  test.beforeEach(async () => {
    allure.epic('API Testing');
    allure.feature('Authentication');
  });

  test('should login successfully with valid credentials', async ({ adminAPI }) => {
    allure.story('Login with valid credentials');
    allure.severity('critical');

    const response = await adminAPI.auth.login(
      Config.admin_username,
      Config.admin_password
    );

    // Assertions
    expect(response.code).toBe(200);
    expect(response.message).toBe('Logged in successfully');
    expect(response.data.access_token).toBeDefined();
  });

  test('should fail login with invalid credentials', async ({ apiClient }) => {
    allure.story('Login with invalid credentials');
    allure.severity('critical');

    const response = await apiClient.auth.login('invalid_user', 'invalid_password');
    expect(response.code).toBe(401);
    expect(response.message).toBe('Invalid username or password');
  });
});
```

### API Testing Best Practices

✅ **Sử dụng TypeScript types** cho request/response
✅ **Tách riêng API logic** vào các class riêng biệt
✅ **Sử dụng fixtures** để tái sử dụng API clients
✅ **Log request/response** vào Allure report
✅ **Validate response schema** và status codes
✅ **Handle errors** properly với try-catch

---

## 🖥️ UI Testing

### Page Object Model

#### 1. BasePage (`pages/BasePage.ts`)

Base class chứa common locators và methods:

```typescript
export class BasePage extends SafeActions {
  // Common buttons
  readonly SEARCH_BUTTON: Locator;
  readonly ADD_BUTTON: Locator;
  readonly SAVE_BUTTON: Locator;
  readonly CANCEL_BUTTON: Locator;

  // Common inputs
  readonly REASON_INPUT: Locator;
  readonly NOTE_INPUT: Locator;

  constructor(page: Page) {
    super(page);
    this.SEARCH_BUTTON = page.locator('button:has-text("Tìm kiếm")');
    this.ADD_BUTTON = page.locator('button:has-text("Thêm")');
    // ... other locators
  }

  // Common methods
  async clickSearch() {
    await this.safeClick(this.SEARCH_BUTTON);
  }
}
```

#### 2. SafeActions (`pages/SafeActions.ts`)

Safe interaction methods để tránh flaky tests:

```typescript
export class SafeActions {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Safe click với wait và retry
  async safeClick(locator: Locator, timeout: number = 30000) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click({ timeout });
  }

  // Safe fill với clear trước
  async safeFill(locator: Locator, value: string, timeout: number = 30000) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.clear();
    await locator.fill(value, { timeout });
  }

  // Safe select
  async safeSelectOption(locator: Locator, value: string, timeout: number = 30000) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.selectOption(value, { timeout });
  }
}
```

#### 3. Feature Page (`pages/salary_page/PaysheetPage.ts`)

Page object cho từng feature:

```typescript
export class PaysheetPage extends BasePage {
  // Locators specific to Paysheet
  readonly PAYSHEET_NAME_INPUT: Locator;
  readonly MONTH_PICKER: Locator;
  readonly EMPLOYEE_DROPDOWN: Locator;

  constructor(page: Page) {
    super(page);
    this.PAYSHEET_NAME_INPUT = page.locator('#paysheet-name');
    this.MONTH_PICKER = page.locator('#month-picker');
    // ... other locators
  }

  // Methods specific to Paysheet
  async createPaysheet(name: string, month: string) {
    await this.safeClick(this.ADD_BUTTON);
    await this.safeFill(this.PAYSHEET_NAME_INPUT, name);
    await this.safeClick(this.MONTH_PICKER);
    await this.selectMonth(month);
    await this.safeClick(this.SAVE_BUTTON);
  }

  async selectMonth(month: string) {
    const monthLocator = this.page.locator(`text="${month}"`);
    await this.safeClick(monthLocator);
  }
}
```

### Viết UI Test

#### Test Fixtures (`tests/ui/base-test.ts`)

```typescript
import { test as base, expect } from '@playwright/test';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';

const test = base.extend<{}>({});

test.afterEach(async ({ page }, testInfo: TestInfo) => {
  await takeScreenshotOnFailure(page, testInfo);
});

export { test, expect };
```

#### UI Test Example (`tests/ui/branch.spec.ts`)

```typescript
import { test, expect } from './base-test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../pages/LoginPage';
import { BranchPage } from '../../pages/BranchPage';
import Config from '../../utils/configUtils';

test.describe('Branch Test', () => {
  let loginPage: LoginPage;
  let branchPage: BranchPage;

  test.beforeEach(async ({ page }) => {
    allure.epic('Admin Management');
    allure.feature('Branch');

    loginPage = new LoginPage(page);
    branchPage = new BranchPage(page);

    // Login
    await page.goto(Config.urlStaging);
    await loginPage.login(Config.admin_username, Config.admin_password);
  });

  test('Create branch with valid data', async ({ page }) => {
    allure.story('Create branch');
    allure.severity('critical');

    await test.step('Navigate to Branch page', async () => {
      await branchPage.navigateToBranchPage();
    });

    await test.step('Create new branch', async () => {
      await branchPage.createBranch({
        name: 'Branch Automation Test',
        shortName: 'BAT',
        address: '123 Test Street',
        phone: '0123456789',
      });
    });

    await test.step('Verify branch created', async () => {
      await expect(branchPage.TOAST_SUCCESS).toBeVisible();
      await expect(branchPage.TOAST_SUCCESS).toHaveText('Thêm chi nhánh thành công');
    });
  });
});
```

### UI Testing Best Practices

✅ **Sử dụng Page Object Model** để tái sử dụng code
✅ **Sử dụng SafeActions** để tránh flaky tests
✅ **Wait for elements** trước khi interact
✅ **Screenshot tự động** khi test fail
✅ **Sử dụng test.step()** để chia nhỏ test
✅ **Cleanup data** sau mỗi test

---

## 🔄 Hybrid Testing

Hybrid testing kết hợp **API + UI + Database** để test end-to-end flows.

### Ví Dụ: Salary Calculation Test

```typescript
import { test, expect } from '../ui/base-test';
import { allure } from 'allure-playwright';
import { createAdminAPIClient } from '../../api/api.client';
import { clearPayrolls, importPayrolls } from '../../db/modules/PayrollsDB';
import { TestUsers } from '../api/test-data/test-users';

test.describe('E2E Salary Calculation', () => {
  let adminAPI: any;

  test.beforeAll(async () => {
    allure.epic('Payroll Management');
    allure.feature('Salary Calculation');

    // Setup: Clear and import test data via Database
    await clearPayrolls();
    await importPayrolls();

    // Setup: Create API client
    adminAPI = await createAdminAPIClient();
  });

  test('Calculate tax with 0 dependents', async ({ page }) => {
    allure.story('Tax calculation without dependents');
    allure.severity('critical');

    const userId = TestUsers.USERID_BAT100_NO_DEPENDENT;

    // Step 1: Create paysheet via API
    await test.step('Create paysheet via API', async () => {
      const response = await adminAPI.paysheet.create({
        name: 'Paysheet Test',
        month: '2024-01',
      });
      expect(response.code).toBe(200);
    });

    // Step 2: Verify calculation via UI
    await test.step('Verify salary calculation on UI', async () => {
      await page.goto(`${Config.urlStaging}/paysheet`);

      const taxAmount = await page.locator(`#tax-${userId}`).textContent();
      expect(taxAmount).toBe('1,500,000');
    });

    // Step 3: Verify data in Database
    await test.step('Verify data in database', async () => {
      const result = await executeQuery(
        'SELECT tax_amount FROM payrolls WHERE user_id = ?',
        [userId]
      );
      expect(result[0].tax_amount).toBe(1500000);
    });
  });
});
```

### Hybrid Testing Flow

```
1. Database Setup
   ↓
2. API Call (Create/Update data)
   ↓
3. UI Verification (Visual check)
   ↓
4. Database Verification (Data integrity)
   ↓
5. Cleanup
```

---

## 🗄️ Database Testing

### Database Connection (`db/core/DBConnection.ts`)

```typescript
import mysql from 'mysql2/promise';

const config = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function getConnection() {
  return await mysql.createConnection(config);
}

export async function executeQuery(sql: string, params: any[] = []) {
  const conn = await getConnection();
  try {
    const [result] = await conn.execute(sql, params);
    return result;
  } finally {
    await conn.end();
  }
}
```

### Database Utilities (`db/core/DBUtils.ts`)

```typescript
// Clear table with condition
export async function clearTable(tableName: string, condition: string = '') {
  const sql = condition
    ? `DELETE FROM ${tableName} WHERE ${condition}`
    : `DELETE FROM ${tableName}`;
  await executeQuery(sql);
  console.log(`Cleared table: ${tableName}`);
}

// Import CSV to table
export async function importFromCSV(
  fileName: string,
  tableName: string,
  columns: string[]
) {
  const absPath = path.resolve(process.cwd(), "test-data", fileName);
  const sql = `
    LOAD DATA LOCAL INFILE '${absPath.replace(/\\/g, "/")}'
    INTO TABLE ${tableName}
    FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
    LINES TERMINATED BY '\r\n'
    IGNORE 1 LINES
    (${columns.join(", ")})
  `;

  const conn = await getConnection();
  try {
    await conn.query({
      sql,
      infileStreamFactory: () => fs.createReadStream(absPath),
    });
    console.log(`Imported data into ${tableName} from ${absPath}`);
  } finally {
    await conn.end();
  }
}
```

### Database Module Example (`db/modules/EmployeeDB.ts`)

```typescript
import { clearTable, importFromCSV } from '../helpers/DBHelper';

export const clearEmployees = async () => {
  await clearTable('users', "name LIKE '%Automation test%'");
}

export async function importUsersFromCSV() {
  await importFromCSV("users.csv", "users", [
    "id", "code", "name", "gender",
    "birthday", "phone", "email", "password",
    // ... other columns
  ]);
}
```

### Sử Dụng Database trong Tests

```typescript
import { clearEmployees, importUsersFromCSV } from '../../db/modules/EmployeeDB';
import { executeQuery } from '../../db/core/DBConnection';

test.beforeAll(async () => {
  // Clear old data
  await clearEmployees();

  // Import test data
  await importUsersFromCSV();
});

test('Verify employee data in database', async () => {
  const result = await executeQuery(
    'SELECT * FROM users WHERE email = ?',
    ['test@example.com']
  );

  expect(result.length).toBe(1);
  expect(result[0].name).toBe('Test User');
});
```

---

## 📊 Allure Report

### Generate Report

```bash
# Generate Allure report
npm run allure:generate

# Open Allure report in browser
npm run allure:open
```

### Allure Report Features

- **Overview**: Tổng quan về test results
- **Suites**: Tests được nhóm theo suites
- **Graphs**: Biểu đồ phân tích
- **Timeline**: Timeline của test execution
- **Behaviors**: Tests theo Epic/Feature/Story
- **Packages**: Tests theo package structure
- **Categories**: Phân loại lỗi

### View Report Online

Report được tự động deploy lên GitHub Pages sau mỗi lần chạy CI:

👉 [https://minhnguyen-eth.github.io/bigtime-playwright/](https://minhnguyen-eth.github.io/bigtime-playwright/)

---

## 🚀 CI/CD với GitHub Actions

### Workflow Configuration (`.github/workflows/main.yml`)

```yaml
name: Playwright Tests

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 23.9.0

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test
        env:
          BASE_URL: ${{ secrets.BASE_URL }}
          ADMIN_USERNAME: ${{ secrets.ADMIN_USERNAME }}
          ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}
          # ... other secrets

      - name: Generate Allure Report
        if: ${{ always() }}
        run: npx allure generate allure-results --clean -o allure-report

      - name: Deploy to GitHub Pages
        if: ${{ github.ref == 'refs/heads/main' }}
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./allure-report
```

### Setup GitHub Secrets

Vào **Settings** → **Secrets and variables** → **Actions** và thêm:

| Secret Name | Description |
|------------|-------------|
| `BASE_URL` | URL của môi trường test |
| `ADMIN_USERNAME` | Admin username |
| `ADMIN_PASSWORD` | Admin password |
| `MANAGER_DEPARTMENT_USERNAME` | Manager department username |
| `MANAGER_DEPARTMENT_PASSWORD` | Manager department password |
| `MANAGER_TEAM_USERNAME` | Manager team username |
| `MANAGER_TEAM_PASSWORD` | Manager team password |
| `EMPLOYEE_USERNAME` | Employee username |
| `EMPLOYEE_PASSWORD` | Employee password |
| `EMPLOYEE2_USERNAME` | Employee 2 username |
| `EMPLOYEE2_PASSWORD` | Employee 2 password |
| `DB_HOST` | Database host |
| `DB_PORT` | Database port |
| `DB_NAME` | Database name |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |

### CI/CD Flow

```
1. Push code to GitHub
   ↓
2. GitHub Actions triggered
   ↓
3. Install dependencies
   ↓
4. Install Playwright browsers
   ↓
5. Run tests
   ↓
6. Generate Allure report
   ↓
7. Deploy report to GitHub Pages
   ↓
8. Upload artifacts (screenshots, videos, traces)
```

---

## ✨ Best Practices

### 1. Test Organization

✅ **Nhóm tests theo module/feature**
```
tests/
├── api/
│   ├── auth.api.spec.ts
│   └── paysheet.api.spec.ts
├── ui/
│   ├── branch.spec.ts
│   └── employee.spec.ts
└── hybrid/
    └── payroll/
        └── salary-calculation.spec.ts
```

✅ **Sử dụng describe blocks** để nhóm related tests
```typescript
test.describe('Branch Management', () => {
  test.describe('Create Branch', () => {
    test('with valid data', async () => {});
    test('with invalid data', async () => {});
  });

  test.describe('Edit Branch', () => {
    test('edit name', async () => {});
    test('edit address', async () => {});
  });
});
```

### 2. Test Data Management

✅ **Sử dụng CSV files** cho bulk test data
✅ **Sử dụng constants** cho test users
✅ **Cleanup data** sau mỗi test
✅ **Isolate test data** giữa các tests

### 3. Locator Strategies

✅ **Ưu tiên sử dụng**:
1. `data-testid` attributes
2. `role` và `name`
3. `text` content
4. CSS selectors (cuối cùng)

❌ **Tránh sử dụng**:
- XPath phức tạp
- Index-based selectors
- Brittle CSS selectors

### 4. Assertions

✅ **Sử dụng meaningful assertions**
```typescript
// Good
expect(response.code).toBe(200);
expect(response.data.access_token).toBeDefined();

// Bad
expect(response).toBeTruthy();
```

✅ **Verify multiple aspects**
```typescript
await expect(element).toBeVisible();
await expect(element).toHaveText('Expected text');
await expect(element).toHaveClass('active');
```

### 5. Error Handling

✅ **Handle expected errors**
```typescript
try {
  await apiClient.delete('/resource/123');
} catch (error) {
  expect(error.message).toContain('Not found');
}
```

✅ **Use allowedStatus for API calls**
```typescript
const response = await api.delete('/resource/123', {
  allowedStatus: [200, 404]
});
```

### 6. Performance

✅ **Reuse authenticated sessions**
✅ **Parallel execution** khi có thể
✅ **Minimize database operations**
✅ **Use API for setup/teardown**

### 7. Maintenance

✅ **Keep Page Objects updated**
✅ **Refactor duplicated code**
✅ **Update test data regularly**
✅ **Review and update selectors**

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Test Timeout
```
Error: Test timeout of 120000ms exceeded
```
**Solution**: Tăng timeout trong `playwright.config.ts` hoặc specific test:
```typescript
test('slow test', async ({ page }) => {
  test.setTimeout(180000); // 3 minutes
});
```

#### 2. Element Not Found
```
Error: Locator.click: Target closed
```
**Solution**:
- Thêm wait before action
- Check if element is visible
- Use SafeActions methods

#### 3. Database Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**:
- Check `.env` file có đúng DB credentials
- Verify database is running
- Check network/firewall settings

#### 4. API Invalid URL
```
TypeError: apiRequestContext.post: Invalid URL
```
**Solution**:
- Check `BASE_URL` trong `.env`
- Verify API endpoint path
- Ensure baseURL is set in APIClient

---

## 📞 Support

- **Author**: Minh Nguyen
- **Email**: minhnguyen@bigapptech.vn
- **GitHub**: [minhnguyen-eth](https://github.com/minhnguyen-eth)
- **Report**: [View Allure Report](https://minhnguyen-eth.github.io/bigtime-playwright/)

---

## 📝 License

Copyright © 2024 [BigAppTech](https://bigapptech.vn/)

---

**Happy Testing! 🎉**
