# 📡 API Reference - BigTime Automation Testing

## 📋 Mục Lục
- [BaseAPI](#baseapi)
- [APIClient](#apiclient)
- [AuthAPI](#authapi)
- [PaysheetAPI](#paysheetapi)
- [Database API](#database-api)
- [Utilities](#utilities)

---

## BaseAPI

Base class cho tất cả API modules. Cung cấp HTTP methods cơ bản.

**File**: `api/base.api.ts`

### Constructor

```typescript
constructor(request: APIRequestContext, baseURL: string = '')
```

### Methods

#### `setToken(token: string)`
Set authentication token cho API requests.

```typescript
apiClient.setToken('your-access-token');
```

#### `get<T>(endpoint: string, options?: RequestOptions): Promise<T>`
Thực hiện GET request.

**Parameters**:
- `endpoint`: API endpoint (e.g., `/api/users`)
- `options`: Optional request options
  - `headers`: Custom headers
  - `allowedStatus`: Allowed status codes (default: `[200]`)

**Example**:
```typescript
const users = await api.get<UserResponse>('/api/users');
const user = await api.get<UserResponse>('/api/users/123', {
  allowedStatus: [200, 404]
});
```

#### `post<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T>`
Thực hiện POST request.

**Parameters**:
- `endpoint`: API endpoint
- `data`: Request body
- `options`: Optional request options

**Example**:
```typescript
const response = await api.post<LoginResponse>('/api/auth/login', {
  username: 'admin@gmail.com',
  password: 'password123'
});
```

#### `put<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T>`
Thực hiện PUT request.

**Example**:
```typescript
const response = await api.put<UpdateResponse>('/api/users/123', {
  name: 'Updated Name'
});
```

#### `delete<T>(endpoint: string, options?: RequestOptions): Promise<T>`
Thực hiện DELETE request.

**Example**:
```typescript
const response = await api.delete<DeleteResponse>('/api/users/123', {
  allowedStatus: [200, 404]
});
```

---

## APIClient

Main API client tổng hợp tất cả API modules.

**File**: `api/api.client.ts`

### Constructor

```typescript
constructor(requestContext: APIRequestContext, baseURL?: string)
```

### Static Methods

#### `create(baseURL?: string): Promise<APIClient>`
Tạo API client instance mới.

```typescript
const client = await APIClient.create('https://api.example.com');
```

### Instance Methods

#### `login(username: string, password: string, remember?: boolean)`
Login và tự động set token.

```typescript
await client.login('admin@gmail.com', 'password123');
```

#### `logout()`
Logout và clear token.

```typescript
await client.logout();
```

#### `setToken(token: string)`
Set token cho tất cả API modules.

```typescript
client.setToken('your-access-token');
```

#### `dispose()`
Dispose API client và close request context.

```typescript
await client.dispose();
```

### Properties

- `auth: AuthAPI` - Authentication API
- `paysheet: PaysheetAPI` - Paysheet API

### Helper Functions

#### `createAuthenticatedAPIClient(username, password, baseURL?)`
Tạo authenticated API client.

```typescript
const client = await createAuthenticatedAPIClient(
  'admin@gmail.com',
  'password123'
);
```

#### `createAdminAPIClient(baseURL?)`
Tạo admin API client (sử dụng admin credentials từ config).

```typescript
const adminAPI = await createAdminAPIClient();
```

#### `createManagerAPIClient(baseURL?)`
Tạo manager API client.

```typescript
const managerAPI = await createManagerAPIClient();
```

#### `createEmployeeAPIClient(baseURL?)`
Tạo employee API client.

```typescript
const employeeAPI = await createEmployeeAPIClient();
```

---

## AuthAPI

Authentication API module.

**File**: `api/auth/auth.api.ts`

### Methods

#### `login(username: string, password: string, remember?: boolean)`
Login với username và password.

**Request**:
```typescript
POST /api/auth/login
{
  "username": "admin@gmail.com",
  "password": "password123",
  "remember": true
}
```

**Response**:
```typescript
{
  "code": 200,
  "message": "Logged in successfully",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600,
    "id": "0000000000",
    "user_type": 0,
    "is_admin": true,
    "is_active_mobile": true,
    "refresh_token": "...",
    "refresh_expires_in": 86400
  }
}
```

**Example**:
```typescript
const response = await authAPI.login('admin@gmail.com', 'password123');
console.log(response.data.access_token);
```

#### `logout()`
Logout khỏi hệ thống.

**Request**:
```typescript
POST /api/auth/logout
```

**Response**:
```typescript
{
  "code": 200,
  "message": "Logged out successfully"
}
```

**Example**:
```typescript
await authAPI.logout();
```

#### `refreshToken(refreshToken: string)`
Refresh access token.

**Request**:
```typescript
POST /api/auth/refresh
{
  "refresh_token": "..."
}
```

**Example**:
```typescript
const response = await authAPI.refreshToken(oldRefreshToken);
```

---

## PaysheetAPI

Paysheet API module.

**File**: `api/paysheet/paysheet.api.ts`

### Methods

#### `create(data: CreatePaysheetRequest)`
Tạo paysheet mới.

**Example**:
```typescript
const response = await paysheetAPI.create({
  name: 'Paysheet January 2024',
  month: '2024-01',
  employees: ['user_id_1', 'user_id_2']
});
```

#### `update(id: string, data: UpdatePaysheetRequest)`
Cập nhật paysheet.

**Example**:
```typescript
await paysheetAPI.update('paysheet_id', {
  name: 'Updated Name'
});
```

#### `cancel(id: string, reason: string)`
Hủy paysheet.

**Example**:
```typescript
await paysheetAPI.cancel('paysheet_id', 'Wrong data');
```

#### `delete(id: string)`
Xóa paysheet.

**Example**:
```typescript
await paysheetAPI.delete('paysheet_id');
```

---

## Database API

Database utilities và modules.

### Core Functions

**File**: `db/core/DBConnection.ts`

#### `getConnection()`
Lấy MySQL connection.

```typescript
const conn = await getConnection();
```

#### `executeQuery(sql: string, params?: any[])`
Thực hiện SQL query.

```typescript
const result = await executeQuery(
  'SELECT * FROM users WHERE email = ?',
  ['admin@gmail.com']
);
```

### Utility Functions

**File**: `db/core/DBUtils.ts`

#### `clearTable(tableName: string, condition?: string)`
Xóa dữ liệu trong table.

```typescript
await clearTable('users', "name LIKE '%Test%'");
```

#### `importFromCSV(fileName: string, tableName: string, columns: string[])`
Import CSV vào table.

```typescript
await importFromCSV('users.csv', 'users', [
  'id', 'name', 'email', 'password'
]);
```

---

## Utilities

### Config Utils

**File**: `utils/configUtils.ts`

```typescript
import Config from '../../utils/configUtils';

// Get config values
const baseURL = Config.urlStaging;
const adminUsername = Config.admin_username;
const adminPassword = Config.admin_password;
```

### Date Utils

**File**: `utils/dateUtils.ts`

Common date utilities for tests.

### Screenshot Utils

**File**: `utils/screenshotUtils.ts`

#### `takeScreenshotOnFailure(page: Page, testInfo: TestInfo)`
Tự động chụp screenshot khi test fail.

```typescript
test.afterEach(async ({ page }, testInfo) => {
  await takeScreenshotOnFailure(page, testInfo);
});
```

---

## Type Definitions

### Common Types

**File**: `api/types/common.types.ts`

```typescript
// Base API Response
export interface BaseAPIResponse<T> {
  code: number;
  message: string;
  data?: T;
}

// Request Options
export interface RequestOptions {
  headers?: Record<string, string>;
  allowedStatus?: number[];
}
```

---

**Xem thêm**: [User Guide](./USER_GUIDE.md) | [Quick Start](./QUICK_START.md)

