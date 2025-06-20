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

export async function clearAllShiftPlan(): Promise<void> {
  const sql = "DELETE FROM shift_plans WHERE name NOT LIKE '%Phân ca tháng%'";
  try {
    const conn = await getConnection();
    const [result] = await conn.execute<mysql.ResultSetHeader>(sql);
    console.info(`Đã xóa ${result.affectedRows} dòng trong bảng shift_plans, giữ lại các bản ghi có tên 'Phân ca tháng'`);
    await conn.end();
  } catch (e) {
    console.error("Lỗi khi xóa dữ liệu trong bảng shift_plans:", e);
  }
}

// Xóa toàn bộ bảng
export async function clearTable(tableName: string): Promise<void> {
  const sql = `TRUNCATE TABLE ${tableName}`;
  try {
    const conn = await getConnection();
    await conn.execute(sql);
    console.info(`Đã xóa toàn bộ dữ liệu trong bảng ${tableName}`);
    await conn.end();
  } catch (e) {
    console.error(`Lỗi khi xoá dữ liệu trong bảng ${tableName}:`, e);
  }
}

// Gọi từng bảng cụ thể
export async function clearAllTables(): Promise<void> {
  await clearTable('leave_applications');
  await clearTable('leave_managements');
  await clearTable('paysheets');
  await clearTable('payslips');
  await clearTable('time_workings');
  await clearTable('shift_plans');
  await clearTable('paysheets');
  await clearTable('evaluation_progress');
  await clearTable('evaluation_criterias');
  await clearTable('notifications');
  await clearTable('reward_users');
  await clearAllAllowanceTypes();
}

export async function ClearAllRewardUsers() {
  await clearTable('reward_users');
}

export async function clearAllNotifications() {
  await clearTable('notifications');
}

export async function clearAllEvaluationProgress() {
  await clearTable('evaluation_progress');
}

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

export async function clearAllRewardType() {
  const sql = "DELETE FROM reward_types WHERE name NOT LIKE '%Khen thưởng%'";
  try {
    const conn = await getConnection();
    const [result] = await conn.execute<mysql.ResultSetHeader>(sql);
    console.info(`Đã xóa ${result.affectedRows} dòng trong bảng reward_types, giữ lại các bản ghi có chứa 'Khen thưởng' trong name.`);
    await conn.end();
  } catch (e) {
    console.error("Lỗi khi xóa dữ liệu trong bảng reward_types:", e);
  }
}

export async function clearAllEvaluationCriterias() {
  const sql = "DELETE FROM evaluation_criterias WHERE name NOT LIKE '%Tiêu chí%'";
  try {
    const conn = await getConnection();
    const [result] = await conn.execute<mysql.ResultSetHeader>(sql);
    console.info(`Đã xóa ${result.affectedRows} dòng trong bảng evaluation_criterias, giữ lại các bản ghi có chứa 'Tiêu chí' trong name.`);
    await conn.end();
  } catch (e) {
    console.error("Lỗi khi xóa dữ liệu trong bảng evaluation_criterias:", e);
  }
}

export async function clearAllWorkingShift() {
  const sql = "DELETE FROM working_shifts WHERE name NOT LIKE '%Ca%'";
  try {
    const conn = await getConnection();
    const [result] = await conn.execute<mysql.ResultSetHeader>(sql);
    console.info(`Đã xóa ${result.affectedRows} dòng trong bảng working_shifts, giữ lại các bản ghi có chứa 'Ca' trong name.`);
    await conn.end();
  } catch (e) {
    console.error("Lỗi khi xóa dữ liệu trong bảng working_shifts:", e);
  }
}

export async function clearAllEluationTypes() {
  const sql = "DELETE FROM evaluation_types WHERE name NOT LIKE '%Đánh giá%'";
  try {
    const conn = await getConnection();
    const [result] = await conn.execute<mysql.ResultSetHeader>(sql);
    console.info(`Đã xóa ${result.affectedRows} dòng trong bảng evaluation_types, giữ lại các bản ghi có chứa 'Đánh giá' trong name.`);
    await conn.end();
  } catch (e) {
    console.error("Lỗi khi xóa dữ liệu trong bảng evaluation_types:", e);
  }
}

// Xử lý đặc biệt với allowance_types
export async function clearAllAllowanceTypes() {
  const sql = "DELETE FROM allowance_types WHERE name <> 'Phụ cấp tiền ăn'";
  try {
    const conn = await getConnection();
    const [result] = await conn.execute<mysql.ResultSetHeader>(sql);
    console.info(`Đã xóa ${result.affectedRows} dòng trong bảng allowance_types, giữ lại 'Phụ cấp tiền ăn'`);
    await conn.end();
  } catch (e) {
    console.error("Lỗi khi xóa dữ liệu trong bảng allowance_types:", e);
  }
}

// Xóa theo user_id
export async function clearLeaveApplicationsForUser(userId: string) {
  const sql = "DELETE FROM leave_applications WHERE user_id = ?";
  try {
    const conn = await getConnection();
    const [result] = await conn.execute<mysql.ResultSetHeader>(sql, [userId]);
    console.info(`Đã xóa ${result.affectedRows} dòng dữ liệu test cho user_id ${userId}`);
    await conn.end();
  } catch (e) {
    console.error(`Lỗi khi xóa dữ liệu test cho user_id ${userId}:`, e);
  }
}


// Kiểm tra tồn tại loại đánh giá
export async function checkShiftPlanExists(name: string): Promise<boolean> {
  const sql = "SELECT COUNT(*) AS count FROM shift_plans WHERE name LIKE ?";
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute<any[]>(sql, [`%${name}%`]);
    await conn.end();
    const count = rows[0].count;
    console.info(`Tìm thấy ${count} loại đánh giá với tên: ${name}`);
    return count > 0;
  } catch (e) {
    console.error("Lỗi khi kiểm tra dữ liệu trong database:", e);
    return false;
  }
}


// Kiểm tra tồn tại loại đánh giá
export async function checkEvaluationTypeExists(name: string): Promise<boolean> {
  const sql = "SELECT COUNT(*) AS count FROM evaluation_types WHERE name LIKE ?";
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute<any[]>(sql, [`%${name}%`]);
    await conn.end();
    const count = rows[0].count;
    console.info(`Tìm thấy ${count} loại đánh giá với tên: ${name}`);
    return count > 0;
  } catch (e) {
    console.error("Lỗi khi kiểm tra dữ liệu trong database:", e);
    return false;
  }
}

// Xóa loại đánh giá theo tên
export async function deleteEvaluationType(name: string): Promise<boolean> {
  const sql = "DELETE FROM evaluation_types WHERE name LIKE ?";
  try {
    const conn = await getConnection();
    const [result] = await conn.execute<mysql.ResultSetHeader>(sql, [`%${name}%`]);
    await conn.end();

    const affectedRows = result.affectedRows;
    console.info(`Đã xóa ${affectedRows} loại đánh giá với tên: ${name}`);
    return affectedRows > 0;
  } catch (e) {
    console.error(`Lỗi khi xóa loại đánh giá với tên ${name}:`, e);
    return false;
  }
}

// Xóa paysheet mới nhất có tên chứa 'Automation test'
export async function deleteLatestPaysheet(): Promise<void> {
  const sqlSelect = `
    SELECT id FROM paysheets 
    WHERE name LIKE '%Automation test%' 
    ORDER BY created_at DESC 
    LIMIT 1
  `;
  const sqlDelete = `DELETE FROM paysheets WHERE id = ?`;

  try {
    const conn = await getConnection();
    const [rows] = await conn.execute<any[]>(sqlSelect);

    if (rows.length === 0) {
      console.warn('Không tìm thấy paysheet nào để xóa');
      await conn.end();
      return;
    }

    const paysheetId = rows[0].id;
    const [result] = await conn.execute<mysql.ResultSetHeader>(sqlDelete, [paysheetId]);

    console.info(`Đã xóa paysheet mới nhất có ID: ${paysheetId}`);
    await conn.end();
  } catch (e) {
    console.error("Lỗi khi xóa paysheet mới nhất:", e);
  }
}
