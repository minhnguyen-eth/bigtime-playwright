import path from 'path';
import fs from 'fs';
import { executeQuery, getConnection } from './DBConnection';

// Check exists generalized
export async function checkExistsWithConditions(
    table: string,
    conditions: Record<string, { value: any; like?: boolean }>): Promise<boolean> {
    const keys = Object.keys(conditions);
    const whereClauses = keys.map(key =>
        conditions[key].like ? `${key} LIKE ?` : `${key} = ?`
    );
    const values = keys.map(key =>
        conditions[key].like ? `%${conditions[key].value}%` : conditions[key].value
    );

    const query = `SELECT COUNT(*) AS count FROM ${table} WHERE ${whereClauses.join(' AND ')}`;
    const result = await executeQuery(query, values);
    const count = (result as any[])[0].count;

    console.info(`Found ${count} records in ${table} with conditions:`, conditions);
    return count > 0;
}

// Clear full table or with condition
export async function clearTable(tableName: string, condition?: string): Promise<void> {
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

// Hàm chung import CSV vào MySQL
export async function importFromCSV(
    fileName: string,
    tableName: string,
    columns: string[]
) {
    // resolve path từ project root
    const absPath = path.resolve(process.cwd(), "test-data", fileName);
    console.log(`Importing file into [${tableName}] from:`, absPath);

    const sql = `
    LOAD DATA LOCAL INFILE '${absPath.replace(/\\/g, "/")}'
    INTO TABLE ${tableName}
    FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
    LINES TERMINATED BY '\r\n'
    IGNORE 1 LINES
    (${columns.join(", ")})
  `;

    const conn = await getConnection();
    try {
        await conn.query({
            sql,
            infileStreamFactory: () => fs.createReadStream(absPath),
        });
        console.log(`Imported data into ${tableName} from ${absPath}`);
    } finally {
        await conn.end();
    }
}
