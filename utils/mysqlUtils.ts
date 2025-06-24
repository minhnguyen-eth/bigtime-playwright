import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
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
export async function clearAllLeaveApplications() {
  await clearTable('leave_applications');
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
  await clearTable('reward_users');
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
