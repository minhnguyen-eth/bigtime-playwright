import path from 'path';
import fs from 'fs';
import { executeQuery, getConnection } from './DBConnection';

/**
 * Check if a record exists in a table based on dynamic conditions
 *
 * @param table - Database table name
 * @param conditions - Object containing column conditions:
 *   {
 *     columnName: {
 *       value: any;        // value to compare
 *       like?: boolean;    // use LIKE instead of '=' if true
 *     }
 *   }
 *
 * @returns Promise<boolean> - true if at least one record exists, otherwise false
 */
export async function checkExistsWithConditions(
    table: string,
    conditions: Record<string, { value: any; like?: boolean }>
): Promise<boolean> {

    // Extract condition keys (column names)
    const keys = Object.keys(conditions);

    // Build WHERE clauses dynamically
    // Example: "name LIKE ?" or "status = ?"
    const whereClauses = keys.map(key =>
        conditions[key].like ? `${key} LIKE ?` : `${key} = ?`
    );

    // Build values array for prepared statement
    // Add wildcard (%) for LIKE queries
    const values = keys.map(key =>
        conditions[key].like
            ? `%${conditions[key].value}%`
            : conditions[key].value
    );

    // Construct SQL query
    const query = `
        SELECT COUNT(*) AS count
        FROM ${table}
        WHERE ${whereClauses.join(' AND ')}
    `;

    // Execute query with parameters
    const result = await executeQuery(query, values);

    // Extract count from query result
    const count = (result as any[])[0].count;

    // Log query result for debugging purposes
    console.info(
        `Found ${count} records in table "${table}" with conditions:`,
        conditions
    );

    // Return true if at least one record exists
    return count > 0;
}

// Clear full table or with condition
export async function clearTable(tableName: string, condition?: string): Promise<void> {
    try {
        // Nếu có điều kiện → chỉ xóa theo condition
        if (condition) {
            const sql = `DELETE FROM ${tableName} WHERE ${condition}`;
            const result = await executeQuery(sql);

            console.info(`Cleared ${result.affectedRows} rows in ${tableName} with condition: ${condition}.`);
        }
        // Không có điều kiện → xóa toàn bộ
        else {
            const deleteSql = `DELETE FROM ${tableName}`;
            const deleteResult = await executeQuery(deleteSql);

            console.info(`Cleared ${deleteResult.affectedRows} rows in ${tableName}.`);

            // Reset auto increment nếu cần (KHÔNG gây lỗi DROP)
            const resetSql = `ALTER TABLE ${tableName} AUTO_INCREMENT = 1`;
            await executeQuery(resetSql);

            console.info(`Reset AUTO_INCREMENT for ${tableName}.`);
        }
    } catch (error) {
        console.error(`Failed to clear table ${tableName}:`, error);
        throw error;
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

// Update table with dynamic fields and conditions
export async function updateTable(
    tableName: string,
    updateData: Record<string, any>,
    conditions: Record<string, any>
): Promise<number> {
    try {
        const updateKeys = Object.keys(updateData);
        const conditionKeys = Object.keys(conditions);

        if (updateKeys.length === 0) {
            throw new Error('updateData cannot be empty');
        }

        if (conditionKeys.length === 0) {
            throw new Error('conditions cannot be empty (to prevent full-table update)');
        }

        const setClause = updateKeys.map(key => `${key} = ?`).join(', ');
        const whereClause = conditionKeys.map(key => `${key} = ?`).join(' AND ');

        const values = [
            ...updateKeys.map(key => updateData[key]),
            ...conditionKeys.map(key => conditions[key]),
        ];

        const sql = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;

        const result = await executeQuery(sql, values);

        console.info(
            `Updated ${result.affectedRows} rows in ${tableName}`,
            { updateData, conditions }
        );

        return result.affectedRows;
    } catch (error) {
        console.error(`Failed to update table ${tableName}:`, error);
        throw error;
    }
}
