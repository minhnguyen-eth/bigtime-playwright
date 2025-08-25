import path from 'path';
import fs from 'fs';
import { clearTable, getConnection } from '../helpers/DBHelper';

export const clearLeaveManagements = async () => {
    await clearTable('leave_managements', "year NOT LIKE '%testData%'");
}

// import leave management data from csv file
export async function importLeaveManagementsFromCSV(fileName: string) {
  // resolve path từ project root
  const absPath = path.resolve(process.cwd(), 'test-data', fileName);
  console.log('Importing file from:', absPath);

  const sql = `
    LOAD DATA LOCAL INFILE '${absPath.replace(/\\/g, '/')}' 
    INTO TABLE leave_managements
    FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
    LINES TERMINATED BY '\r\n'
    IGNORE 1 LINES
    (id, user_id, year, total_leave, days_take, reason, status, 
    created_at, updated_at, created_by, updated_by, deleted_at, deleted_by)
  `;

  const conn = await getConnection();
  try {
    await conn.query({
      sql,
      infileStreamFactory: () => fs.createReadStream(absPath), 
    });
    console.log(` Imported leave management data from ${absPath}`);
  } finally {
    await conn.end();
  }
}