/**
 * Paysheet Test Helpers
 * Helper functions to create paysheet test data
 */

import { CreatePaysheetRequest } from '../../../api/paysheet/paysheet.api';

/**
 * Generate paysheet data for current month
 */
export function generatePaysheetData(options?: {
  name?: string;
  note?: string;
  type?: number;
  status?: number;
  month?: string; // Format: "YYYY-MM"
  isChooseAllUser?: boolean;
  is_by_department?: boolean;
  department_ids?: string[];
  users_id?: string[];
}): CreatePaysheetRequest {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = options?.month || `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  
  // Parse month to get start and end dates
  const [yearStr, monthStr] = month.split('-');
  const monthNum = parseInt(monthStr);
  const lastDay = new Date(parseInt(yearStr), monthNum, 0).getDate();
  
  const startDate = `${month}-01`;
  const endDate = `${month}-${lastDay}`;
  const createdAt = currentDate.toISOString().slice(0, 19).replace('T', ' ');

  return {
    id: "",
    name: options?.name || `Test Paysheet ${month}`,
    note: options?.note || "",
    type: options?.type ?? 0, // 0: monthly, 1: custom
    status: options?.status ?? 0,
    rangeMonth: month,
    start_date: startDate,
    end_date: endDate,
    created_at: createdAt,
    created_by: "admin",
    isChooseAllUser: options?.isChooseAllUser ?? false,
    is_by_department: options?.is_by_department ?? false,
    department_ids: options?.department_ids || [],
    users_id: options?.users_id || []
  };
}

/**
 * Generate paysheet for specific employees
 */
export function generatePaysheetForEmployees(employeeIds: string[], name?: string): CreatePaysheetRequest {
  return generatePaysheetData({
    name: name || `Paysheet for ${employeeIds.length} employees`,
    isChooseAllUser: false,
    is_by_department: false,
    users_id: employeeIds
  });
}

/**
 * Generate paysheet for all users
 */
export function generatePaysheetForAllUsers(name?: string): CreatePaysheetRequest {
  return generatePaysheetData({
    name: name || 'Paysheet for All Users',
    isChooseAllUser: true,
    is_by_department: false,
    users_id: []
  });
}

/**
 * Generate paysheet by department
 */
export function generatePaysheetByDepartment(departmentIds: string[], name?: string): CreatePaysheetRequest {
  return generatePaysheetData({
    name: name || `Paysheet for ${departmentIds.length} departments`,
    isChooseAllUser: false,
    is_by_department: true,
    department_ids: departmentIds,
    users_id: []
  });
}

/**
 * Generate paysheet for specific month
 */
export function generatePaysheetForMonth(year: number, month: number, name?: string): CreatePaysheetRequest {
  const monthStr = `${year}-${String(month).padStart(2, '0')}`;
  return generatePaysheetData({
    name: name || `Paysheet ${monthStr}`,
    month: monthStr
  });
}

/**
 * Generate custom paysheet with date range
 */
export function generateCustomPaysheet(options: {
  name?: string;
  start_date: string;
  end_date: string;
  note?: string;
  users_id?: string[];
  department_ids?: string[];
  isChooseAllUser?: boolean;
  is_by_department?: boolean;
}): CreatePaysheetRequest {

  // Extract month from start date
  const rangeMonth = options.start_date.substring(0, 7); // "YYYY-MM"

  return {
    id: "",
    name: options.name || `Custom Paysheet ${rangeMonth}`,
    note: options.note || "Custom date range",
    type: 0, 
    status: 0,
    rangeMonth: rangeMonth,
    start_date: options.start_date,
    end_date: options.end_date,
    isChooseAllUser: options.isChooseAllUser ?? false,
    is_by_department: options.is_by_department ?? false,
    department_ids: options.department_ids || [],
    users_id: options.users_id || []
  };
}

/**
 * Example usage:
 *
 * // Basic paysheet for current month
 * const data1 = generatePaysheetData();
 *
 * // Paysheet for specific employees
 * const data2 = generatePaysheetForEmployees(['emp1', 'emp2']);
 *
 * // Paysheet for all users
 * const data3 = generatePaysheetForAllUsers();
 *
 * // Paysheet by department
 * const data4 = generatePaysheetByDepartment(['dept1', 'dept2']);
 *
 * // Paysheet for specific month
 * const data5 = generatePaysheetForMonth(2025, 11);
 *
 * // Custom date range
 * const data6 = generateCustomPaysheet({
 *   name: 'Paysheet 1-15 Nov',
 *   start_date: '2025-11-01',
 *   end_date: '2025-11-15',
 *   users_id: ['emp1', 'emp2']
 * });
 */

