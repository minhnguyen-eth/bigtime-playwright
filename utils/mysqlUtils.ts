import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

const config = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

async function getConnection() {
  return await mysql.createConnection(config);
}


// Gọi hàm mock (chạy trực tiếp)
const today = new Date().toISOString().split('T')[0];
mockCheckinData('4cMiTbHpAz', today);



export async function mockCheckinData(userId: string, date: string) {
  const conn = await getConnection();

  const checkDayId = uuidv4().slice(0, 10);
  const checkTimeIdIn = uuidv4().slice(0, 10);
  const checkTimeIdOut = uuidv4().slice(0, 10);

  try {
    // INSERT check_days
    await conn.execute(
      `INSERT INTO check_days (
    id, user_id, day, late_time_in, early_time_out,
    overtime, late_break_duration, total_work_time,
    reason, type, type_working, status, created_at
  )
  VALUES (?, ?, ?, ?, ?, NULL, NULL, ?, NULL, 1, 1, 1, NOW())`,
      [checkDayId, userId, date, '00:00:00', '00:00:00', '09:00:00']
    );


    // INSERT check_times
    await conn.execute(
      `INSERT INTO check_times (
         id, check_day_id, user_agent, longitude, latitude, 
         checked_time, reason, is_updated, created_at, created_by
       )
       VALUES (?, ?, ?, ?, ?, ?, NULL, 0, NOW(), ?)`,
      [checkTimeIdIn, checkDayId, 'MockAgent', 106.9481984, 10.9477888, `${date} 09:00:00`, userId]
    );

    await conn.execute(
      `INSERT INTO check_times (
         id, check_day_id, user_agent, longitude, latitude, 
         checked_time, reason, is_updated, created_at, created_by
       )
       VALUES (?, ?, ?, ?, ?, ?, NULL, 0, NOW(), ?)`,
      [checkTimeIdOut, checkDayId, 'MockAgent', 106.9481984, 10.9477888, `${date} 18:10:00`, userId]
    );

    // INSERT check_time_histories
    await conn.execute(
      `INSERT INTO check_time_histories (
         id, check_time_id, time_update, reason, created_at, updated_at
       )
       VALUES (?, ?, ?, NULL, NOW(), NOW())`,
      [uuidv4().slice(0, 10), checkTimeIdIn, '09:00:00']
    );

    await conn.execute(
      `INSERT INTO check_time_histories (
         id, check_time_id, time_update, reason, created_at, updated_at
       )
       VALUES (?, ?, ?, NULL, NOW(), NOW())`,
      [uuidv4().slice(0, 10), checkTimeIdOut, '18:10:00']
    );

    console.log('Mock data created successfully');
  } catch (error) {
    console.error('Failed to mock data:', error);
  } finally {
    await conn.end();
  }
}

// General query executor
async function executeQuery(sql: string, params: any[] = []): Promise<any> {
  const conn = await getConnection();
  try {
    const [result] = await conn.execute(sql, params);
    return result;
  } catch (error) {
    console.error('DB Error:', error);
    throw error;
  } finally {
    await conn.end();
  }
}

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

// Specific Clear functions preserved (for backward compatibility)

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
  await clearTable('departments', "name LIKE '%Automation test%'");
}

export const clearLevel = async () => {
  await clearTable('levels', "name LIKE '%Automation test%'");
}

export async function clearBranch() {
  await clearTable('branches', "name LIKE '%Automation test%'");
}

export async function clearPosition() {
  await clearTable('positions', "name LIKE '%Automation test%'");
}

export async function clearEmploymentContract() {
  await clearTable('employment_contracts');
}

export async function clearResignation() {
  await clearTable('resignations', "reason NOT LIKE '%Test data%'");
}

export async function clearAllowanceType() {
  await clearTable('allowance_types', "name NOT LIKE '%Phụ cấp%'");
}

export async function clearTerm() {
  await clearTable('terms', "title NOT LIKE '%Điều khoản%'");
}

export async function clearAllEmployees() {
  await clearTable('users', "name LIKE '%user%'");
}

export async function clearAllLeaveApplications() {
  await clearTable('leave_applications');
}

export async function clearTeam() {
  await clearTable('teams', "name NOT LIKE '%Nhóm%'");
}

export async function clearAllLeaveManagements() {
  await clearTable('leave_managements');
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
  await clearTable('evaluation_progress');
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

// Check exists generalized
async function checkExists(table: string, name: string): Promise<boolean> {
  const result = await executeQuery(`SELECT COUNT(*) AS count FROM ${table} WHERE name LIKE ?`, [`%${name}%`]);
  const count = (result as any[])[0].count;
  console.info(`Found ${count} records in ${table} with name like '${name}'`);
  return count > 0;
}

export async function checkShiftPlanExists(name: string) {
  return checkExists('shift_plans', name);
}

export async function checkEvaluationTypeExists(name: string) {
  return checkExists('evaluation_types', name);
}

export async function deleteEvaluationType(name: string) {
  const result = await executeQuery("DELETE FROM evaluation_types WHERE name LIKE ?", [`%${name}%`]) as mysql.ResultSetHeader;
  console.info(`Deleted ${result.affectedRows} rows from evaluation_types where name like '${name}'`);
  return result.affectedRows > 0;
}

export async function deleteLatestPaysheet() {
  const rows = await executeQuery(`
    SELECT id FROM paysheets 
    WHERE name LIKE '%Automation test%' 
    ORDER BY created_at DESC LIMIT 1
  `) as any[];

  if (rows.length === 0) {
    console.warn('No paysheet found to delete');
    return;
  }

  const paysheetId = rows[0].id;
  await executeQuery(`DELETE FROM paysheets WHERE id = ?`, [paysheetId]);
  console.info(`Deleted latest paysheet with ID: ${paysheetId}`);
}
