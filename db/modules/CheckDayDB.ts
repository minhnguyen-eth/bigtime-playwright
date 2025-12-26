import { clearTable, importFromCSV } from '../helpers/DBHelper';

export const clearCheckDay = async () => {
    await clearTable('check_days', "reason NOT LIKE '%Test Data%'");
};


export const importCheckDay = async () => {
    await importFromCSV("check_days.csv", "check_days", [
        "id", "user_id",
        "day", "late_time_in", "early_time_out",
        "overtime", "late_break_duration",
        "total_work_time", "reason", "type",
        "type_working", "status", "created_at", "updated_at"
    ]);
}
