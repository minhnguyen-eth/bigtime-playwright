import { checkExistsWithConditions, clearTable, importFromCSV } from '../helpers/DBHelper';

export async function checkShiftPlanExists(name: string) {
    return checkExistsWithConditions('shift_plans', {
        name: { value: name, like: true }
    });
}

export async function clearShiftPlan() {
    await clearTable('shift_plans', "name NOT LIKE '%Test Data%'");
}

// Import shift plans
export async function importShiftPlan() {

    await importFromCSV("shift_plans.csv", "shift_plans", [
        "id",
        "name",
        "start_date",
        "end_date",
        "repeat_type",
        "repeat_config",
        "object_type",
        "objects",
        "status",
        "created_at",
        "created_by",
        "updated_at",
        "updated_by",
        "deleted_at",
        "deleted_by",
    ]);
}
