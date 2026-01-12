// utils/logger.ts
// Logger dùng để log request / response API trong automation test
// Có cơ chế mask dữ liệu nhạy cảm (password, token, otp...)
// Giúp debug test dễ hơn mà không làm lộ thông tin bảo mật

export class Logger {

    /**
     * Log thông tin request API
     * @param method HTTP method (GET, POST, PUT, DELETE...)
     * @param url Endpoint gọi API
     * @param body Request body (optional)
     */
    static request(method: string, url: string, body?: any) {
        console.log(
            `\n[API ${method}] ${url}`,
            // Nếu có body thì stringify + sanitize trước khi log
            body ? JSON.stringify(this.sanitize(body), null, 2) : ''
        );
    }

    /**
     * Log thông tin response API
     * @param status HTTP status code
     * @param body Response body (optional)
     */
    static response(status: number, body?: any) {
        console.log(
            `[API Response] Status: ${status}`,
            // Mask dữ liệu nhạy cảm trước khi log
            body ? JSON.stringify(this.sanitize(body), null, 2) : ''
        );
    }

    /**
     * Log thông tin thông thường
     * Dùng cho các bước xử lý logic trong test
     */
    static info(message: string) {
        console.log(`[INFO] ${message}`);
    }

    /**
     * Log lỗi
     * @param message Mô tả lỗi
     * @param error Error object hoặc exception (optional)
     */
    static error(message: string, error?: any) {
        console.error(`[ERROR] ${message}`, error);
    }

    /**
     * CORE FUNCTION
     * Clone object và mask dữ liệu nhạy cảm
     * Tránh mutate object gốc
     */
    private static sanitize(data: any): any {
        if (!data) return data;

        // Clone sâu object để không ảnh hưởng data gốc
        const cloned = JSON.parse(JSON.stringify(data));

        // Mask dữ liệu nhạy cảm
        this.mask(cloned);

        return cloned;
    }

    /**
     * Đệ quy duyệt object và che dữ liệu nhạy cảm
     * @param obj Object cần mask
     */
    private static mask(obj: any) {
        if (typeof obj !== 'object' || obj === null) return;

        // Danh sách key nhạy cảm cần che
        const SENSITIVE_KEYS = [
            'password',
            'access_token',
            'refresh_token',
            'token',
            'otp'
        ];

        for (const key of Object.keys(obj)) {
            if (SENSITIVE_KEYS.includes(key)) {
                // Che giá trị nếu là dữ liệu nhạy cảm
                obj[key] = '[HIDDEN]';
            } 
            // Nếu value là object → đệ quy tiếp
            else if (typeof obj[key] === 'object') {
                this.mask(obj[key]);
            }
        }
    }
}
