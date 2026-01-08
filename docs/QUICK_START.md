# 🚀 Quick Start Guide - BigTime Automation Testing

## ⚡ Cài Đặt Nhanh (5 phút)

### 1. Clone & Install
```bash
git clone https://github.com/minhnguyen-eth/bigtime-playwright.git
cd bigtime-playwright
npm install
npx playwright install
```

### 2. Tạo File `.env`
```env
BASE_URL=https://bigtime-pre.bigapptech.vn
ADMIN_USERNAME=admin@gmail.com
ADMIN_PASSWORD=your_password
MANAGER_DEPARTMENT_USERNAME=admindepartment@gmail.com
MANAGER_DEPARTMENT_PASSWORD=your_password
MANAGER_TEAM_USERNAME=managerteam@gmail.com
MANAGER_TEAM_PASSWORD=your_password
EMPLOYEE_USERNAME=employee@gmail.com
EMPLOYEE_PASSWORD=your_password
EMPLOYEE2_USERNAME=employee2@gmail.com
EMPLOYEE2_PASSWORD=your_password
DB_HOST=your_db_host
DB_PORT=3306
DB_NAME=bigtime_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
```

### 3. Chạy Tests
```bash
# Chạy tất cả tests
npm run test

# Chạy chỉ API tests
npm run test:api

# Chạy chỉ UI tests
npm run test:ui

# Chạy với browser hiển thị
npm run test:headed
```

### 4. Xem Report
```bash
# Generate và mở Allure report
npm run allure:generate
npm run allure:open
```

---

## 📝 Viết Test Đầu Tiên

### API Test Example

**File**: `tests/api/example.api.spec.ts`

```typescript
import { apiTest as test, expect } from './api-test';
import { allure } from 'allure-playwright';

test.describe('My First API Test', () => {
  test('should login successfully', async ({ adminAPI }) => {
    allure.epic('API Testing');
    allure.feature('Authentication');
    allure.severity('critical');

    const response = await adminAPI.auth.login(
      'admin@gmail.com',
      'password123'
    );

    expect(response.code).toBe(200);
    expect(response.data.access_token).toBeDefined();
  });
});
```

### UI Test Example

**File**: `tests/ui/example.spec.ts`

```typescript
import { test, expect } from './base-test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';

test.describe('My First UI Test', () => {
  test('should login successfully', async ({ page }) => {
    allure.epic('UI Testing');
    allure.feature('Login');
    allure.severity('critical');

    const loginPage = new LoginPage(page);

    await page.goto(Config.urlStaging);
    await loginPage.login(
      Config.admin_username,
      Config.admin_password
    );

    await expect(page).toHaveURL(/.*dashboard/);
  });
});
```

---

## 🎯 Các Lệnh Thường Dùng

```bash
# Chạy tests
npm run test                    # Chạy tất cả tests
npm run test:api                # Chỉ API tests
npm run test:ui                 # Chỉ UI tests
npm run test:headed             # Với browser hiển thị
npm run test:debug              # Debug mode

# Chạy test cụ thể
npx playwright test tests/api/auth.api.spec.ts
npx playwright test tests/ui/branch.spec.ts

# Chạy test theo line number
npx playwright test tests/api/auth.api.spec.ts:30

# Allure report
npm run allure:generate         # Generate report
npm run allure:open             # Mở report

# Deploy
npm run deploy                  # Deploy lên GitHub Pages
npm run report                  # Test + Generate + Deploy

# Playwright tools
npx playwright codegen          # Generate code
npx playwright test --ui        # UI mode
```

---

## 📁 Cấu Trúc Quan Trọng

```
bigtime-playwright/
├── api/                    # API Testing Layer
│   ├── base.api.ts        # Base API class
│   ├── api.client.ts      # API Client
│   └── auth/              # Auth API
├── pages/                  # Page Object Model
│   ├── BasePage.ts        # Base Page
│   ├── SafeActions.ts     # Safe methods
│   └── LoginPage.ts       # Login page
├── tests/                  # Test Suites
│   ├── api/               # API tests
│   ├── ui/                # UI tests
│   └── hybrid/            # Hybrid tests
├── db/                     # Database Layer
│   ├── core/              # DB connection
│   └── modules/           # DB modules
├── utils/                  # Utilities
│   └── configUtils.ts     # Config
└── .env                    # Environment variables
```

---

## 🔧 Troubleshooting

### Test Timeout?
```typescript
test('slow test', async ({ page }) => {
  test.setTimeout(180000); // 3 minutes
});
```

### Element Not Found?
```typescript
// Sử dụng SafeActions
await this.safeClick(locator);
await this.safeFill(locator, value);
```

### API Invalid URL?
- Check `BASE_URL` trong `.env`
- Verify endpoint path bắt đầu bằng `/`

### Database Connection Error?
- Check DB credentials trong `.env`
- Verify database đang chạy

---

## 📚 Tài Liệu Chi Tiết

Xem [USER_GUIDE.md](./USER_GUIDE.md) để biết thêm chi tiết về:
- Cấu trúc dự án đầy đủ
- API Testing chi tiết
- UI Testing với Page Object Model
- Hybrid Testing
- Database Testing
- CI/CD với GitHub Actions
- Best Practices

---

## 🎉 Bắt Đầu Ngay!

```bash
# Clone project
git clone https://github.com/minhnguyen-eth/bigtime-playwright.git
cd bigtime-playwright

# Install
npm install
npx playwright install

# Setup .env file
# (Copy nội dung từ phần 2 ở trên)

# Run tests
npm run test

# View report
npm run allure:generate
npm run allure:open
```

---

**Happy Testing! 🚀**

