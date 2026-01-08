# 📚 BigTime Automation Testing - Documentation Index

## 🎯 Bắt Đầu

### Người Mới Bắt Đầu
1. **[Quick Start Guide](./QUICK_START.md)** ⭐ BẮT ĐẦU TẠI ĐÂY
   - Cài đặt trong 5 phút
   - Chạy test đầu tiên
   - Các lệnh cơ bản

2. **[User Guide](./USER_GUIDE.md)** 📖 ĐỌC TIẾP
   - Hướng dẫn chi tiết đầy đủ
   - API Testing
   - UI Testing
   - Hybrid Testing
   - Database Testing
   - Best Practices

### Người Đã Có Kinh Nghiệm
- **[API Reference](./API_REFERENCE.md)** - API documentation
- **[Contributing Guide](./CONTRIBUTING.md)** - Quy tắc đóng góp
- **[Architecture](./architecture.md)** - Kiến trúc hệ thống
- **[Commands](./commands.md)** - Cheat sheet

---

## 📖 Tài Liệu Theo Chủ Đề

### 🚀 Setup & Installation
- [Quick Start - Cài Đặt](./QUICK_START.md#-cài-đặt-nhanh-5-phút)
- [User Guide - Cài Đặt](./USER_GUIDE.md#-cài-đặt)
- [User Guide - Cấu Hình](./USER_GUIDE.md#️-cấu-hình)

### 🔌 API Testing
- [User Guide - API Testing](./USER_GUIDE.md#-api-testing)
- [API Reference - BaseAPI](./API_REFERENCE.md#baseapi)
- [API Reference - APIClient](./API_REFERENCE.md#apiclient)
- [API Reference - AuthAPI](./API_REFERENCE.md#authapi)
- [API Reference - PaysheetAPI](./API_REFERENCE.md#paysheetapi)
- [Quick Start - API Test Example](./QUICK_START.md#api-test-example)

### 🖥️ UI Testing
- [User Guide - UI Testing](./USER_GUIDE.md#️-ui-testing)
- [User Guide - Page Object Model](./USER_GUIDE.md#page-object-model)
- [Quick Start - UI Test Example](./QUICK_START.md#ui-test-example)
- [Contributing - Thêm Page Object](./CONTRIBUTING.md#thêm-page-object-mới)

### 🔄 Hybrid Testing
- [User Guide - Hybrid Testing](./USER_GUIDE.md#-hybrid-testing)
- [User Guide - Hybrid Testing Flow](./USER_GUIDE.md#hybrid-testing-flow)

### 🗄️ Database Testing
- [User Guide - Database Testing](./USER_GUIDE.md#️-database-testing)
- [API Reference - Database API](./API_REFERENCE.md#database-api)
- [Contributing - Thêm Database Module](./CONTRIBUTING.md#thêm-database-module-mới)

### 📊 Allure Report
- [User Guide - Allure Report](./USER_GUIDE.md#-allure-report)
- [User Guide - Allure Annotations](./USER_GUIDE.md#allure-annotations)
- [Contributing - Allure Annotations](./CONTRIBUTING.md#allure-annotations)

### 🚀 CI/CD
- [User Guide - CI/CD với GitHub Actions](./USER_GUIDE.md#-cicd-với-github-actions)
- [User Guide - Setup GitHub Secrets](./USER_GUIDE.md#setup-github-secrets)

### ✨ Best Practices
- [User Guide - Best Practices](./USER_GUIDE.md#-best-practices)
- [Contributing - Quy Tắc Chung](./CONTRIBUTING.md#-quy-tắc-chung)
- [Contributing - Code Quality](./CONTRIBUTING.md#1-code-quality)
- [Contributing - Test Quality](./CONTRIBUTING.md#2-test-quality)

### 🐛 Troubleshooting
- [User Guide - Troubleshooting](./USER_GUIDE.md#-troubleshooting)
- [Quick Start - Troubleshooting](./QUICK_START.md#-troubleshooting)

### 🤝 Contributing
- [Contributing Guide](./CONTRIBUTING.md)
- [Contributing - Cấu Trúc Code](./CONTRIBUTING.md#-cấu-trúc-code)
- [Contributing - Naming Conventions](./CONTRIBUTING.md#-naming-conventions)
- [Contributing - Git Workflow](./CONTRIBUTING.md#-git-workflow)

---

## 🎓 Learning Path

### Level 1: Beginner (Người Mới)
1. Đọc [Quick Start Guide](./QUICK_START.md)
2. Cài đặt và chạy test đầu tiên
3. Đọc [User Guide - Giới Thiệu](./USER_GUIDE.md#-giới-thiệu)
4. Đọc [User Guide - Cấu Trúc Dự Án](./USER_GUIDE.md#-cấu-trúc-dự-án)

### Level 2: Intermediate (Đã Biết Cơ Bản)
1. Đọc [User Guide - API Testing](./USER_GUIDE.md#-api-testing)
2. Đọc [User Guide - UI Testing](./USER_GUIDE.md#️-ui-testing)
3. Viết API test đầu tiên
4. Viết UI test đầu tiên
5. Đọc [API Reference](./API_REFERENCE.md)

### Level 3: Advanced (Nâng Cao)
1. Đọc [User Guide - Hybrid Testing](./USER_GUIDE.md#-hybrid-testing)
2. Đọc [User Guide - Database Testing](./USER_GUIDE.md#️-database-testing)
3. Viết hybrid test
4. Đọc [Contributing Guide](./CONTRIBUTING.md)
5. Đóng góp code vào project

### Level 4: Expert (Chuyên Gia)
1. Đọc [Architecture](./architecture.md)
2. Review và improve existing code
3. Mentor team members
4. Optimize test performance
5. Improve CI/CD pipeline

---

## 📋 Cheat Sheets

### Commands
```bash
# Run tests
npm run test              # All tests
npm run test:api          # API tests only
npm run test:ui           # UI tests only

# Reports
npm run allure:generate   # Generate report
npm run allure:open       # Open report

# Playwright
npx playwright test --ui  # UI mode
npx playwright codegen    # Generate code
```

### Common Imports
```typescript
// API Testing
import { apiTest as test, expect } from './api-test';
import { createAdminAPIClient } from '../../api/api.client';

// UI Testing
import { test, expect } from './base-test';
import { LoginPage } from '../../pages/LoginPage';

// Database
import { executeQuery } from '../../db/core/DBConnection';
import { clearTable, importFromCSV } from '../../db/core/DBUtils';

// Utils
import Config from '../../utils/configUtils';
import { allure } from 'allure-playwright';
```

### Allure Annotations
```typescript
allure.epic('Module Name');
allure.feature('Feature Name');
allure.story('User Story');
allure.severity('critical'); // blocker, critical, normal, minor, trivial
```

---

## 🔗 Quick Links

- 📊 [Allure Report](https://minhnguyen-eth.github.io/bigtime-playwright/)
- 🐙 [GitHub Repository](https://github.com/minhnguyen-eth/bigtime-playwright)
- 🏢 [BigAppTech Website](https://bigapptech.vn/)

---

## 📞 Support

Nếu bạn cần hỗ trợ:
1. Đọc [Troubleshooting](./USER_GUIDE.md#-troubleshooting)
2. Tìm trong [API Reference](./API_REFERENCE.md)
3. Liên hệ: minhnguyen@bigapptech.vn

---

**Happy Testing! 🎉**

