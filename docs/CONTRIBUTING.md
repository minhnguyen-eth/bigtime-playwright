# 🤝 Contributing Guide - BigTime Automation Testing

## 📋 Mục Lục
- [Quy Tắc Chung](#quy-tắc-chung)
- [Cấu Trúc Code](#cấu-trúc-code)
- [Naming Conventions](#naming-conventions)
- [Viết Tests](#viết-tests)
- [Code Review](#code-review)
- [Git Workflow](#git-workflow)

---

## 🎯 Quy Tắc Chung

### 1. Code Quality

✅ **PHẢI**:
- Viết code rõ ràng, dễ đọc
- Sử dụng TypeScript types
- Follow existing patterns
- Viết comments cho logic phức tạp
- Test code trước khi commit

❌ **KHÔNG**:
- Hardcode values
- Duplicate code
- Commit code chưa test
- Push trực tiếp lên main
- Ignore linter warnings

### 2. Test Quality

✅ **PHẢI**:
- Test case phải pass locally trước khi commit
- Cleanup test data sau khi chạy
- Sử dụng meaningful test names
- Add Allure annotations
- Handle errors properly

❌ **KHÔNG**:
- Commit failing tests
- Leave test data in database
- Use `.only()` hoặc `.skip()` trong commit
- Hardcode test data
- Ignore flaky tests

---

## 📁 Cấu Trúc Code

### Thêm API Module Mới

1. **Tạo API class** trong `api/[module]/[module].api.ts`:
```typescript
import { BaseAPI } from '../base.api';

export class ModuleAPI extends BaseAPI {
  async create(data: any) {
    return await this.post('/api/module', data);
  }
  
  async update(id: string, data: any) {
    return await this.put(`/api/module/${id}`, data);
  }
}
```

2. **Thêm vào APIClient** trong `api/api.client.ts`:
```typescript
export class APIClient {
  public module: ModuleAPI;
  
  constructor(requestContext: APIRequestContext, baseURL?: string) {
    this.module = new ModuleAPI(requestContext, baseURL);
  }
  
  setToken(token: string) {
    this.module.setToken(token);
  }
}
```

3. **Tạo test file** trong `tests/api/[module].api.spec.ts`

### Thêm Page Object Mới

1. **Tạo Page class** trong `pages/[module]_page/[Page].ts`:
```typescript
import { BasePage } from '../BasePage';
import { Page, Locator } from '@playwright/test';

export class ModulePage extends BasePage {
  readonly MODULE_INPUT: Locator;
  
  constructor(page: Page) {
    super(page);
    this.MODULE_INPUT = page.locator('#module-input');
  }
  
  async createModule(name: string) {
    await this.safeClick(this.ADD_BUTTON);
    await this.safeFill(this.MODULE_INPUT, name);
    await this.safeClick(this.SAVE_BUTTON);
  }
}
```

2. **Tạo test file** trong `tests/ui/[module].spec.ts`

### Thêm Database Module Mới

1. **Tạo DB module** trong `db/modules/[Module]DB.ts`:
```typescript
import { clearTable, importFromCSV } from '../helpers/DBHelper';

export const clearModuleData = async () => {
  await clearTable('module_table', "name LIKE '%Test%'");
}

export async function importModuleData() {
  await importFromCSV('module.csv', 'module_table', [
    'id', 'name', 'created_at'
  ]);
}
```

2. **Export trong** `db/helpers/DBHelper.ts`

---

## 📝 Naming Conventions

### Files

```
✅ ĐÚNG:
- auth.api.ts
- PaysheetPage.ts
- salary-calculation.spec.ts
- EmployeeDB.ts

❌ SAI:
- Auth.ts
- paysheet-page.ts
- SalaryCalculation.spec.ts
- employee_db.ts
```

### Classes

```typescript
✅ ĐÚNG:
export class AuthAPI extends BaseAPI {}
export class PaysheetPage extends BasePage {}

❌ SAI:
export class authApi extends BaseAPI {}
export class paysheet_page extends BasePage {}
```

### Methods

```typescript
✅ ĐÚNG:
async createPaysheet(data: any) {}
async getUserById(id: string) {}

❌ SAI:
async CreatePaysheet(data: any) {}
async get_user_by_id(id: string) {}
```

### Variables

```typescript
✅ ĐÚNG:
const adminAPI = await createAdminAPIClient();
const paysheetPage = new PaysheetPage(page);
const userId = 'user_123';

❌ SAI:
const AdminAPI = await createAdminAPIClient();
const PaysheetPage = new PaysheetPage(page);
const user_id = 'user_123';
```

### Test Names

```typescript
✅ ĐÚNG:
test('should login successfully with valid credentials', async () => {});
test('should fail login with invalid password', async () => {});

❌ SAI:
test('Login test', async () => {});
test('test_login_invalid', async () => {});
```

---

## ✍️ Viết Tests

### Test Structure

```typescript
import { test, expect } from './base-test';
import { allure } from 'allure-playwright';

test.describe('Feature Name', () => {
  // Setup
  test.beforeEach(async ({ page }) => {
    allure.epic('Module Name');
    allure.feature('Feature Name');
    // Setup code
  });

  // Test case
  test('should do something', async ({ page }) => {
    allure.story('User story');
    allure.severity('critical');

    // Arrange
    const data = { name: 'Test' };

    // Act
    await test.step('Step 1: Do action', async () => {
      // Implementation
    });

    // Assert
    await test.step('Step 2: Verify result', async () => {
      expect(result).toBe(expected);
    });
  });

  // Cleanup
  test.afterEach(async () => {
    // Cleanup code
  });
});
```

### Allure Annotations

**PHẢI có** trong mỗi test:
```typescript
allure.epic('Module Name');      // Module level
allure.feature('Feature Name');  // Feature level
allure.story('User Story');      // Story level
allure.severity('critical');     // Severity level
```

**Severity levels**:
- `blocker` - Chặn toàn bộ hệ thống
- `critical` - Chức năng chính
- `normal` - Chức năng thông thường
- `minor` - Chức năng phụ
- `trivial` - UI/UX issues

### Test Data

```typescript
✅ ĐÚNG:
// Sử dụng constants
const TEST_USER = {
  username: 'test@example.com',
  password: 'Test123!@#'
};

// Sử dụng config
const username = Config.admin_username;

// Sử dụng CSV import
await importUsersFromCSV();

❌ SAI:
// Hardcode
await login('admin@gmail.com', '123456');
```

---

## 👀 Code Review

### Checklist cho Reviewer

- [ ] Code follow naming conventions
- [ ] Tests pass locally và trên CI
- [ ] Có Allure annotations đầy đủ
- [ ] Không có hardcoded values
- [ ] Cleanup test data properly
- [ ] No `.only()` hoặc `.skip()`
- [ ] Comments cho logic phức tạp
- [ ] TypeScript types đầy đủ
- [ ] Follow existing patterns

### Checklist cho Author

Trước khi tạo PR:
- [ ] Run tests locally: `npm run test`
- [ ] Check linter: `npx eslint .`
- [ ] Generate report: `npm run allure:generate`
- [ ] Review own code
- [ ] Update documentation nếu cần
- [ ] Add meaningful commit messages

---

## 🔄 Git Workflow

### Branch Naming

```
✅ ĐÚNG:
feature/add-paysheet-api-tests
fix/login-page-timeout
refactor/cleanup-database-utils

❌ SAI:
paysheet-tests
fix-bug
update
```

### Commit Messages

```
✅ ĐÚNG:
feat: add paysheet API tests
fix: resolve login page timeout issue
refactor: cleanup database utilities
docs: update API reference

❌ SAI:
update
fix bug
add tests
```

### Pull Request

**Title format**:
```
[Type] Brief description

Examples:
[Feature] Add paysheet API tests
[Fix] Resolve login timeout issue
[Refactor] Cleanup database utilities
```

**Description template**:
```markdown
## Changes
- Added paysheet API tests
- Updated APIClient to include PaysheetAPI

## Testing
- [x] Tests pass locally
- [x] Tests pass on CI
- [x] Allure report generated

## Screenshots (if applicable)
[Add screenshots]

## Related Issues
Closes #123
```

---

## 🚀 Workflow

1. **Create branch** từ `main`
2. **Develop** feature/fix
3. **Test locally**: `npm run test`
4. **Commit** với meaningful message
5. **Push** branch lên GitHub
6. **Create PR** với description đầy đủ
7. **Wait for review** và CI pass
8. **Address feedback** nếu có
9. **Merge** sau khi approved

---

**Happy Contributing! 🎉**

