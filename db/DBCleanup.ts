import { executeQuery } from './DBHelper';
import mysql from 'mysql2/promise';

// Clear full table or with condition
async function clearTable(tableName: string, condition?: string): Promise<void> {
    const sql = condition
        ? `DELETE FROM ${tableName} WHERE ${condition}`
        : `TRUNCATE TABLE ${tableName}`;

    const result = await executeQuery(sql);

    if ('affectedRows' in result) {
        console.info(`Cleared ${result.affectedRows} rows in ${tableName} ${condition ? 'with condition' : ''}.`);
    } else {
        console.info(`Truncated table ${tableName}.`);
    }
}

// Clear all tables
export async function clearAllTables() {
    const tables = [
        clearAllLeaveApplications,
        clearAllLeaveManagements,
        clearAllPaysheets,
        clearAllPayslips,
        clearAllTimeWorkings,
        clearAllShiftPlan,
        clearAllEvaluationProgress,
        clearAllEvaluationCriterias,
        clearAllNotifications,
        clearAllRewardUsers,
        clearAllAllowanceTypes
    ];

    for (const clearFunc of tables) {
        await clearFunc();
    }
}

// Specific Clear functions preserved (for backward compatibility)
export const clearOvertimeSubmission = async () => {
    await clearTable('overtime_submissions');
};

export const clearDebts = async () => {
    await clearTable('debts', "note NOT LIKE '%Test data%'");
};

export const clearCheckDay = async () => {
    await clearTable('check_days');
};

export const clearCheckTime = async () => {
    await clearTable('check_times');
};

export const clearHolidayManagement = async () => {
    await clearTable('holiday_managements');
};

export const clearDepartment = async () => {
    await clearTable('departments', "name LIKE '%Automation test%' OR name LIKE '%z%'");
}

export const clearLevel = async () => {
    await clearTable('levels', "name LIKE '%Automation test%' OR name LIKE '%z%'");
}

export const clearBranch = async () => {
    await clearTable('branches', "name LIKE '%Automation test%' OR name LIKE '%z%'");
}

export const clearPosition = async () => {
    await clearTable('positions', "name LIKE '%Automation test%' or name LIKE '%z%'");
}

export const clearEmploymentContract = async () => {
    await clearTable('employment_contracts');
}

export const clearResignation = async () => {
    await clearTable('resignations', "reason NOT LIKE '%Test data%'");
}

export const clearAllowanceType = async () => {
    await clearTable('allowance_types', "name NOT LIKE '%Phụ cấp%'");
}

export async function clearTerm() {
    await clearTable('terms', "title NOT LIKE '%Điều khoản%'");
}

export async function clearEmployees() {
    await clearTable('users', "name LIKE '%Automation test%' or name LIKE '%z%'");
}

export async function clearAllLeaveApplications() {
    await clearTable('leave_applications', "reason NOT LIKE '%Test data%'");
}

export async function clearTeam() {
    await clearTable('teams', "name NOT LIKE '%Nhóm%'");
}

export async function clearAllLeaveManagements() {
    await clearTable('leave_managements', "year NOT LIKE '%2024%'");
}

export async function clearAllPaysheets() {
    await clearTable('paysheets');
}

export async function clearAllPayslips() {
    await clearTable('payslips');
}

export async function clearAllTimeWorkings() {
    await clearTable('time_workings');
}

export async function clearAllShiftPlan() {
    await clearTable('shift_plans', "name NOT LIKE '%Phân ca tháng%'");
}

export async function clearAllEvaluationProgress() {
    await clearTable('evaluation_progress', "id NOT LIKE '%Testdata%'");
}

export async function clearAllEvaluationCriterias() {
    await clearTable('evaluation_criterias', "name NOT LIKE '%Tiêu chí%'");
}

export async function clearAllNotifications() {
    await clearTable('notifications');
}

export async function clearAllRewardUsers() {
    await clearTable('reward_users', "name NOT LIKE '%Test data%'");
}

export async function clearAllRewardType() {
    await clearTable('reward_types', "name NOT LIKE '%Khen thưởng%'");
}

export async function clearAllWorkingShift() {
    await clearTable('working_shifts', "name NOT LIKE '%Ca%'");
}

export async function clearAllEluationTypes() {
    await clearTable('evaluation_types', "name NOT LIKE '%Đánh giá%'");
}

export async function clearAllAllowanceTypes() {
    await clearTable('allowance_types', "name <> 'Phụ cấp tiền ăn'");
}

// Xóa theo user_id
export async function clearLeaveApplicationsForUser(userId: string) {
    await executeQuery("DELETE FROM leave_applications WHERE user_id = ?", [userId]);
    console.info(`Cleared leave applications for user_id ${userId}`);
}

export async function deleteEvaluationType(name: string) {
    const result = await executeQuery("DELETE FROM evaluation_types WHERE name LIKE ?", [`%${name}%`]) as mysql.ResultSetHeader;
    console.info(`Deleted ${result.affectedRows} rows from evaluation_types where name like '${name}'`);
    return result.affectedRows > 0;
}
