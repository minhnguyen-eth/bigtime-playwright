import { executeQuery } from './DBHelper';

// Check exists generalized
async function checkExistsWithConditions(
    table: string,
    conditions: Record<string, { value: any; like?: boolean }>
): Promise<boolean> {
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


export async function checkContractExists(note: string, type: number, status: number) {
    return checkExistsWithConditions('employment_contracts', {
        note: { value: note, like: true },
        type: { value: type },
        status: { value: status }
    });
}

export async function checkLeaveApplicationExists(reason: string, status?: number) {
    const conditions: Record<string, { value: any; like?: boolean }> = {
        reason: { value: reason, like: true }
    };
    if (status !== undefined) {
        conditions.status = { value: status };
    }
    return checkExistsWithConditions('leave_applications', conditions);
}

export async function checkShiftPlanExists(name: string) {
    return checkExistsWithConditions('shift_plans', {
        name: { value: name, like: true }
    });
}

export async function checkEvaluationTypeExists(name: string) {
    return checkExistsWithConditions('evaluation_types', {
        name: { value: name, like: true }
    });
}
