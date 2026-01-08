import { BaseAPI } from '../base.api';
import { BaseAPIResponse } from '../types/common.types';

/**
 * Auth Data Types - Based on actual BigTime API
 */
export interface LoginData {
    access_token: string;
    expires_in: number;
    id: string;
    user_type: number;
    is_admin: boolean;
    is_active_mobile: boolean;
    refresh_token: string;
    refresh_expires_in: number;
}

/**
 * Response types for Auth API
 */
export interface LoginResponse extends BaseAPIResponse<LoginData> {
    code: 200;
    message: string;
    data: LoginData;
}

export interface LogoutResponse extends BaseAPIResponse<any> {
    code: 200;
    message: string;
}

export interface RefreshTokenResponse extends BaseAPIResponse<LoginData> {
    code: 200;
    message: string;
    data: LoginData;
}

/**
 * AuthAPI - Handles authentication related API calls
 */
export class AuthAPI extends BaseAPI {
    /**
     * Login with username and password
     * BigTime API endpoint: POST /api/auth/login
     * Body: { username, password, remember }
     */
    async login(
        username: string,
        password: string,
        remember: boolean = true
    ): Promise<LoginResponse> {
        const response = await this.post<LoginResponse>(
            '/api/auth/login',
            { username, password, remember },
            { allowedStatus: [200, 401] }
        );

        if (response.code === 200 && response.data?.access_token) {
            this.setToken(response.data.access_token);
        }

        return response;
    }

    /**
     * Logout current user
     */
    async logout(): Promise<LogoutResponse> {
        return this.post<LogoutResponse>('/api/auth/logout');
    }

    /**
     * Refresh authentication token
     */
    async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
        return this.post<RefreshTokenResponse>('/api/auth/refresh', {
            refreshToken,
        });
    }

    /**
     * Get current user profile
     */
    async getCurrentUser() {
        return this.get('/api/auth/me');
    }

    /**
     * Change password
     */
    async changePassword(oldPassword: string, newPassword: string) {
        return this.post('/api/auth/change-password', {
            oldPassword,
            newPassword,
        });
    }

    /**
     * Reset password
     */
    async resetPassword(email: string) {
        return this.post('/api/auth/reset-password', {
            email,
        });
    }
}
