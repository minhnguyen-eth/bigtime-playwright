import path from 'path';
import fs from 'fs';
import { clearTable, getConnection } from '../helpers/DBHelper';

export const clearEmployees = async () => {
    await clearTable('users', "name LIKE '%Automation test%' or name LIKE '%z%'");
}

export async function importUsersFromCSV(fileName: string) {
    // resolve path từ project root
    const absPath = path.resolve(process.cwd(), 'test-data', fileName);
    console.log('Importing file from:', absPath);

    const sql = `
    LOAD DATA LOCAL INFILE '${absPath.replace(/\\/g, '/')}' 
    INTO TABLE users
    FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
    LINES TERMINATED BY '\r\n'
    IGNORE 1 LINES
    (id, code, name, gender, birthday, phone, email, password,
     address, fingerprint, avatar, barcode, joining_date, position_id, branch_id,
     team_id, level_id, user_type, is_working, salt, remember_token, code_identification,
     registered_at, registered_address, bank_name, bank_number, last_login_at, note,
     user_id_unique, is_active_mobile, setup_salary_id, status, created_at,
     created_by, updated_at, updated_by, deleted_at, deleted_by,
     resume_id, is_must_check_in_at_shift_start, is_single_checkin_per_day)
    `;

    const conn = await getConnection();
    try {
        await conn.query({
            sql,
            infileStreamFactory: () => fs.createReadStream(absPath),
        });
        console.log(` Imported users data from ${absPath}`);
    } finally {
        await conn.end();
    }
}
