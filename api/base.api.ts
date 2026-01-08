import { APIRequestContext, APIResponse } from '@playwright/test';
import { allure } from 'allure-playwright';

/**
 * BaseAPI - Base class for all API clients
 * Provides common HTTP methods with error handling, logging, and Allure reporting
 */
export class BaseAPI {
    protected request: APIRequestContext;
    protected baseURL: string;
    protected token?: string;

    constructor(request: APIRequestContext, baseURL: string = '') {
        this.request = request;
        this.baseURL = baseURL;
    }

    /**
     * Set authentication token for API requests
     */
    setToken(token: string) {
        this.token = token;
    }

    /**
     * Get default headers with authentication
     */
    protected getHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-client-request': 'HERO',
            'x-client-language': 'en',
            ...customHeaders,
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    /**
     * Log API request to Allure report
     */
    protected logRequest(method: string, url: string, data?: any) {
        allure.step(`API ${method}: ${url}`, async () => {
            if (data) {
                allure.attachment('Request Body', JSON.stringify(data, null, 2), 'application/json');
            }
        });
        console.log(`[API ${method}] ${url}`, data ? JSON.stringify(data) : '');
    }

    /**
     * Log API response to Allure report
     */
    protected async logResponse(response: APIResponse) {
        const status = response.status();
        const body = await response.text();

        allure.step(`Response Status: ${status}`, async () => {
            if (body) {
                allure.attachment('Response Body', body, 'application/json');
            }
        });

        console.log(`[API Response] Status: ${status}`, body);
    }

    /**
     * Handle API response with error checking
     * BigTime API returns format: { code: number, message: string, data: any }
     */
    protected async handleResponse<T = any>(
        response: APIResponse,
        options: { allowedStatus?: number[] } = {}
    ): Promise<T> {
        await this.logResponse(response);

        const status = response.status();
        const allowedStatus = options.allowedStatus ?? [200];

        if (!allowedStatus.includes(status)) {
            const errorBody = await response.text();
            throw new Error(
                `API request failed with status ${status}: ${errorBody}`
            );
        }

        const contentType = response.headers()['content-type'];
        if (contentType && contentType.includes('application/json')) {
            return await response.json() as T;
        }

        return await response.text() as T;
    }


    /**
     * GET request
     */
    async get<T = any>(endpoint: string, options: {
        params?: Record<string, any>;
        headers?: Record<string, string>;
    } = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        this.logRequest('GET', url);

        const response = await this.request.get(url, {
            headers: this.getHeaders(options.headers),
            params: options.params,
            ignoreHTTPSErrors: true, // Ignore SSL certificate errors for BigTime API
        });

        return this.handleResponse<T>(response);
    }

    /**
     * POST request
     */
    async post<T>(
        endpoint: string,
        data?: any,
        options?: {
            headers?: Record<string, string>;
            allowedStatus?: number[];
        }
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        this.logRequest('POST', url, data);

        const response = await this.request.post(url, {
            headers: this.getHeaders(options?.headers),
            data,
            ignoreHTTPSErrors: true, // Ignore SSL certificate errors for BigTime API
        });

        const status = response.status();
        const body = await response.json();

        const allowed = options?.allowedStatus ?? [200, 201];

        if (!allowed.includes(status)) {
            throw new Error(
                `Unexpected status ${status}: ${JSON.stringify(body)}`
            );
        }

        return body;
    }

    /**
     * PUT request
     */
    async put<T = any>(endpoint: string, data?: any, options: {
        headers?: Record<string, string>;
    } = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        this.logRequest('PUT', url, data);

        const response = await this.request.put(url, {
            headers: this.getHeaders(options.headers),
            data,
            ignoreHTTPSErrors: true, // Ignore SSL certificate errors for BigTime API
        });

        return this.handleResponse<T>(response);
    }

    /**
     * PATCH request
     */
    async patch<T = any>(endpoint: string, data?: any, options: {
        headers?: Record<string, string>;
    } = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        this.logRequest('PATCH', url, data);

        const response = await this.request.patch(url, {
            headers: this.getHeaders(options.headers),
            data,
        });

        return this.handleResponse<T>(response);
    }

    /**
     * DELETE request
     */
    async delete<T = any>(endpoint: string, options: {
        headers?: Record<string, string>;
    } = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        this.logRequest('DELETE', url);

        const response = await this.request.delete(url, {
            headers: this.getHeaders(options.headers),
            ignoreHTTPSErrors: true, // Ignore SSL certificate errors for BigTime API
        });

        return this.handleResponse<T>(response);
    }

    /**
     * Upload file
     */
    async uploadFile<T = any>(endpoint: string, filePath: string, fieldName: string = 'file', options: {
        headers?: Record<string, string>;
        data?: Record<string, any>;
    } = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        this.logRequest('POST (File Upload)', url);

        const response = await this.request.post(url, {
            headers: this.getHeaders(options.headers),
            multipart: {
                [fieldName]: filePath,
                ...options.data,
            },
            ignoreHTTPSErrors: true, // Ignore SSL certificate errors for BigTime API
        });

        return this.handleResponse<T>(response);
    }
}
