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
  await clearAllAllowanceTypes();
}


export async function clearAllShiftPlan() {
  await clearTable('shift_plans');
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

export async function clearAllEluationTypes() {
  const sql = "DELETE FROM evaluation_types WHERE name <> 'Đánh giá chuyên cần'";
  try {
    const conn = await getConnection();
    const [result] = await conn.execute<mysql.ResultSetHeader>(sql);
    console.info(`Đã xóa ${result.affectedRows} dòng trong bảng evaluation_types, giữ lại 'Đánh giá chuyên cần'`);
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
