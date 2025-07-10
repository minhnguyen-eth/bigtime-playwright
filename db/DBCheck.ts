import { executeQuery } from './DBHelper';

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
