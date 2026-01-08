# 🎯 BigTime Automation Testing Project

[![Playwright Tests](https://github.com/minhnguyen-eth/bigtime-playwright/actions/workflows/main.yml/badge.svg)](https://github.com/minhnguyen-eth/bigtime-playwright/actions/workflows/main.yml)
[![Allure Report](https://img.shields.io/badge/Allure-Report-green)](https://minhnguyen-eth.github.io/bigtime-playwright/)

Dự án kiểm thử tự động cho **BigTime** - Hệ thống quản lý nhân sự, chấm công và tính lương.

📊 **Xem báo cáo test tự động**:
👉 [Click để xem Allure Report](https://minhnguyen-eth.github.io/bigtime-playwright/)

---

## 📚 Tài Liệu

| Tài Liệu | Mô Tả |
|----------|-------|
| 🚀 **[Quick Start Guide](./docs/QUICK_START.md)** | Bắt đầu nhanh trong 5 phút |
| 📖 **[User Guide](./docs/USER_GUIDE.md)** | Hướng dẫn chi tiết đầy đủ |
| 📡 **[API Reference](./docs/API_REFERENCE.md)** | API documentation chi tiết |
| 🤝 **[Contributing Guide](./docs/CONTRIBUTING.md)** | Hướng dẫn đóng góp cho team |
| 🏗️ **[Architecture](./docs/architecture.md)** | Kiến trúc hệ thống |
| ⚙️ **[Commands](./docs/commands.md)** | Các lệnh thường dùng |

---

## ⚡ Quick Start

### Cài Đặt
```bash
git clone https://github.com/minhnguyen-eth/bigtime-playwright.git
cd bigtime-playwright
npm install
npx playwright install
```

### Cấu Hình
Tạo file `.env`:
```env
BASE_URL=https://bigtime-pre.bigapptech.vn
ADMIN_USERNAME=admin@gmail.com
ADMIN_PASSWORD=your_password
# ... (xem QUICK_START.md để biết thêm)
```

### Chạy Tests
```bash
npm run test              # Chạy tất cả tests
npm run test:api          # Chỉ API tests
npm run test:ui           # Chỉ UI tests
npm run allure:open       # Xem report
```

---

## 📦 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Playwright** | Test automation framework |
| **TypeScript** | Programming language |
| **Allure Report** | Test reporting |
| **MySQL2** | Database testing |
| **GitHub Actions** | CI/CD pipeline |
| **GitHub Pages** | Report hosting |

---

## 🏗️ Kiến Trúc

```
bigtime-playwright/
├── 📂 api/              # API Testing Layer
├── 📂 pages/            # Page Object Model
├── 📂 tests/            # Test Suites
│   ├── api/            # API Tests
│   ├── ui/             # UI Tests
│   └── hybrid/         # Hybrid Tests (API + UI + DB)
├── 📂 db/               # Database Layer
├── 📂 utils/            # Utilities
└── 📂 test-data/        # Test Data (CSV)
```

---

## ✨ Tính Năng

✅ **API Testing** - REST API testing với BaseAPI pattern
✅ **UI Testing** - Page Object Model với SafeActions
✅ **Hybrid Testing** - Kết hợp API + UI + Database
✅ **Database Testing** - MySQL integration
✅ **Allure Report** - Chi tiết, trực quan
✅ **Screenshot** - Tự động khi test fail
✅ **CI/CD** - GitHub Actions tự động
✅ **Auto Deploy** - Report lên GitHub Pages

---

## 📊 Test Coverage

| Module | API Tests | UI Tests | Hybrid Tests |
|--------|-----------|----------|--------------|
| Authentication | ✅ | ✅ | - |
| Branch Management | - | ✅ | - |
| Employee Management | - | ✅ | - |
| Payroll & Salary | ✅ | ✅ | ✅ |
| Timekeeping | - | ✅ | ✅ |
| Contract Management | - | ✅ | - |
| Leave Management | - | ✅ | - |
| Evaluation | - | ✅ | - |

---

## 🚀 CI/CD

Tests tự động chạy trên GitHub Actions khi:
- Push code lên `main` hoặc `master`
- Tạo Pull Request

Report tự động deploy lên GitHub Pages sau mỗi lần chạy.

---

## 📞 Liên Hệ

- **Author**: Minh Nguyen
- **Email**: minhnguyen@bigapptech.vn
- **Company**: [BigAppTech](https://bigapptech.vn/)
- **GitHub**: [minhnguyen-eth](https://github.com/minhnguyen-eth)

---

## 📝 License

Copyright © 2024 [BigAppTech](https://bigapptech.vn/)

---

**Happy Testing! 🎉**
