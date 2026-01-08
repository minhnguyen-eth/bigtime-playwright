import { BaseAPI } from '../base.api';
import { BaseAPIResponse } from '../types/common.types';

/**
 * Paysheet data types - Based on actual BigTime API
 */
export interface Paysheet {
  id?: string;
  name: string;
  note?: string;
  type: number; // 0: monthly, 1: custom
  status: number;
  rangeMonth: string; // Format: "YYYY-MM"
  start_date: string; // Format: "YYYY-MM-DD"
  end_date: string; // Format: "YYYY-MM-DD"
  created_at?: string;
  created_by?: string;
  isChooseAllUser?: boolean;
  is_by_department?: boolean;
  department_ids?: string[];
  users_id?: string[];
}

/**
 * Create Paysheet Request - Based on actual API
 */
export interface CreatePaysheetRequest {
  id?: string;
  name: string;
  note?: string;
  type: number; // 0: monthly, 1: custom
  status?: number;
  rangeMonth: string; // Format: "YYYY-MM"
  start_date: string; // Format: "YYYY-MM-DD"
  end_date: string; // Format: "YYYY-MM-DD"
  created_at?: string;
  created_by?: string;
  isChooseAllUser?: boolean;
  is_by_department?: boolean;
  department_ids?: string[];
  users_id?: string[];
}

/**
 * Cancel Paysheet Request
 */
export interface CancelPaysheetRequest {
  id: string;
  cancel_reason: string;
}

export interface UpdatePaysheetRequest {
  name?: string;
  note?: string;
  type?: number;
  status?: number;
  rangeMonth?: string;
  start_date?: string;
  end_date?: string;
}

/**
 * Response types
 */
export interface PaysheetListResponse extends BaseAPIResponse<Paysheet[]> {
  code: 200;
  message: string;
  data: Paysheet[];
}

export interface PaysheetResponse extends BaseAPIResponse<Paysheet> {
  code: 200;
  message: string;
  data: Paysheet;
}

export interface CreatePaysheetResponse extends BaseAPIResponse<string> {
  code: 200;
  message: string;
  data: string; // Returns paysheet ID
}

/**
 * PaysheetAPI - Handles paysheet management API calls
 * Based on actual BigTime API endpoints
 */
export class PaysheetAPI extends BaseAPI {
  /**
   * Get list of paysheets with pagination
   */
  async getPaysheets(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    month?: string;
    year?: number;
    status?: number;
  }): Promise<PaysheetListResponse> {
    return this.get<PaysheetListResponse>('/api/pay-sheet', { params });
  }

  /**
   * Get paysheet by ID
   */
  async getPaysheetById(id: string): Promise<PaysheetResponse> {
    return this.get<PaysheetResponse>(`/api/pay-sheet/${id}`);
  }

  /**
   * Create new paysheet
   * BigTime API endpoint: POST /api/pay-sheet/create
   * Returns paysheet ID as string
   */
  async createPaysheet(data: CreatePaysheetRequest): Promise<CreatePaysheetResponse> {
    return this.post<CreatePaysheetResponse>('/api/pay-sheet/create', data);
  }

  /**
   * Update paysheet
   */
  async updatePaysheet(id: string, data: UpdatePaysheetRequest): Promise<PaysheetResponse> {
    return this.put<PaysheetResponse>(`/api/pay-sheet/${id}`, data);
  }

  /**
   * Cancel paysheet
   */
  async cancelPaysheet(id: string, cancel_reason: string): Promise<BaseAPIResponse<any>> {
    return this.post(`/api/pay-sheet/cancel-salary`, {
      id,
      cancel_reason
    },
      {
        allowedStatus: [200, 422]
      }
    );
  }

  /**
   * Calculate paysheet
   */
  async calculatePaysheet(id: string): Promise<PaysheetResponse> {
    return this.post<PaysheetResponse>(`/api/pay-sheet/${id}/calculate`);
  }

  /**
   * Approve paysheet
   */
  async approvePaysheet(id: string): Promise<PaysheetResponse> {
    return this.post<PaysheetResponse>(`/api/pay-sheet/${id}/approve`);
  }

  /**
   * Reject paysheet
   */
  async rejectPaysheet(id: string, reason: string): Promise<PaysheetResponse> {
    return this.post<PaysheetResponse>(`/api/pay-sheet/${id}/reject`, { reason });
  }

  /**
   * Export paysheet to PDF
   */
  async exportPaysheetToPDF(id: string): Promise<BaseAPIResponse<any>> {
    return this.get(`/api/pay-sheet/${id}/export/pdf`);
  }

  /**
   * Export paysheet to Excel
   */
  async exportPaysheetToExcel(id: string): Promise<BaseAPIResponse<any>> {
    return this.get(`/api/pay-sheet/${id}/export/excel`);
  }

  /**
   * Get paysheet statistics
   */
  async getPaysheetStats(params?: {
    month?: string;
    year?: number;
  }): Promise<BaseAPIResponse<any>> {
    return this.get('/api/pay-sheet/stats', { params });
  }

  /**
   * Add employees to paysheet
   */
  async addEmployeesToPaysheet(id: string, employeeIds: string[]): Promise<PaysheetResponse> {
    return this.post<PaysheetResponse>(`/api/pay-sheet/${id}/employees`, {
      users_id: employeeIds,
    });
  }

  /**
   * Remove employees from paysheet
   */
  async removeEmployeesFromPaysheet(id: string, employeeIds: string[]): Promise<PaysheetResponse> {
    return this.post<PaysheetResponse>(`/api/pay-sheet/${id}/remove-employees`, {
      users_id: employeeIds,
    });
  }
}

