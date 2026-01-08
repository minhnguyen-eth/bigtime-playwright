// utils/logger.ts
export class Logger {

    static request(method: string, url: string, body?: any) {
        console.log(
            `\n[API ${method}] ${url}`,
            body ? JSON.stringify(this.sanitize(body), null, 2) : ''
        );
    }

    static response(status: number, body?: any) {
        console.log(
            `[API Response] Status: ${status}`,
            body ? JSON.stringify(this.sanitize(body), null, 2) : ''
        );
    }

    static info(message: string) {
        console.log(`[INFO] ${message}`);
    }

    static error(message: string, error?: any) {
        console.error(`[ERROR] ${message}`, error);
    }

    // 🔐 CORE: sanitize data
    private static sanitize(data: any): any {
        if (!data) return data;

        const cloned = JSON.parse(JSON.stringify(data));

        this.mask(cloned);

        return cloned;
    }

    private static mask(obj: any) {
        if (typeof obj !== 'object' || obj === null) return;

        const SENSITIVE_KEYS = [
            'password',
            'access_token',
            'refresh_token',
            'token',
            'otp'
        ];

        for (const key of Object.keys(obj)) {
            if (SENSITIVE_KEYS.includes(key)) {
                obj[key] = '[HIDDEN]';
            } else if (typeof obj[key] === 'object') {
                this.mask(obj[key]);
            }
        }
    }
}
