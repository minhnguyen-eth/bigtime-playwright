### Kiến trúc hệ thống cho dự án Automation Testing của BigTime
================================================

## Tổng quan 
Dự án Automation Testing cho BigTime được thiết kế để đảm bảo chất lượng, tính khả thi và khả mở rộng của các bài kiểm tra tự động cho ứng dụng BigTime.

## Mục tiêu 
- Đảm bảo chất lượng và ổn định của ứng dụng BigTime.
- Phát hiện sớm các lỗi và sự cố trong quá trình phát triển.
- Tăng hiệu quả và tiết kiệm thời gian cho quá trình kiểm thử.

## Cấu trúc thư mục
```
bigtime-playwright/
├── docs/
│   ├── architecture.md
│   └── commands.md
├── pages/
│   ├── BasePage.ts
│   ├── SafeActions.ts
│   ├── LoginPage.ts
│   └── ...
├── tests/
│   ├── login.spec.ts
│   └── ...
├── utils/
│   ├── configUtils.ts
│   └── screenshotUtils.ts
├── db/
│   ├── core/
│   │   └── DBConnection.ts
│   └── helpers/
│       └── DBHelper.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Giải thích
Thư mục pages chứa các page object, trong đó:
- BasePage.ts là lớp cơ sở cho tất cả các page object, chứa các hàm chung và các locator chung.
- SafeActions.ts là lớp chứa các hàm an toàn để tương tác với các phần tử trên trang, tránh các lỗi do trạng thái của trang
- ToastPage.ts là lớp chứa các hàm để xác nhận các toast message dùng chung cho toàn bộ hệ thống.
- ValidationPage.ts là lớp chứa các hàm để xác nhận các validation message dùng chung cho toàn bộ hệ thống.

Thư mục tests chứa tất cả các test case của hệ thống 

Thư mục utils chứa file cấu hình và các hàm tiện ích dùng chung cho toàn bộ hệ thống.

Thư mục db chưa các file liên quan đến database, trong đó:
- core chứa các file liên quan đến kết nối và thực hiện các query đến database
- helpers chứa các file liên quan đến các hàm helper để tương tác với database
- modules chứa các file liên quan đến các module của hệ thống, mỗi module sẽ có các hàm để tương tác với database của module đó

Tư mục test-data chứa các file csv dùng để import dữ liệu vào database cho các test case


