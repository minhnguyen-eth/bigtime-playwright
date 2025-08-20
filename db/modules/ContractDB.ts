import path from 'path';
import fs from 'fs';
import { checkExistsWithConditions, clearTable, executeQuery, getConnection } from '../helpers/DBHelper';

// check exists in db
export async function checkContractExists(note: string, type: number, status: number) {
  return checkExistsWithConditions('employment_contracts',
    {
      note: { value: note, like: true },
      type: { value: type },
      status: { value: status }
    });
}

// clear data 
export const clearEmploymentContract = async () => {
  await clearTable('employment_contracts', "id NOT LIKE '%testData%'");
}

// import contracts from csv file
export async function importContractsFromCSV(fileName: string) {
  // resolve path từ project root
  const absPath = path.resolve(process.cwd(), 'test-data', fileName);
  console.log('Importing file from:', absPath);

  const sql = `
    LOAD DATA LOCAL INFILE '${absPath.replace(/\\/g, '/')}' 
    INTO TABLE employment_contracts
    FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
    LINES TERMINATED BY '\r\n'
    IGNORE 1 LINES
    (id, code, user_id, start_date, end_date, base_salary, position_id, note, content, terminate_reason, cancel_reason, type, status, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by)
  `;

  const conn = await getConnection();
  try {
    await conn.query({
      sql,
      infileStreamFactory: () => fs.createReadStream(absPath), 
    });
    console.log(` Imported contracts from ${absPath}`);
  } finally {
    await conn.end();
  }
}