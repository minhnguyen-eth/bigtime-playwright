import { checkExistsWithConditions, clearTable } from '../helpers/DBHelper';

export async function checkShiftPlanExists(name: string) {
    return checkExistsWithConditions('shift_plans', {
        name: { value: name, like: true }
    });
}

export async function clearShiftPlan() {
    await clearTable('shift_plans', "name NOT LIKE '%Phân ca tháng%'");
}
