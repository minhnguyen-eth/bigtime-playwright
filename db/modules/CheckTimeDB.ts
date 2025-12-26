import { clearTable, importFromCSV } from '../helpers/DBHelper';


export const clearCheckTime = async () => {
    await clearTable('check_times', "reason NOT LIKE '%Test Data%'");
};

export const importCheckTime = async () => {
    await importFromCSV("check_times.csv", "check_times", [
        "id", "check_day_id", "user_agent",
        "longitude", "latitude", "checked_time",
        "reason", "is_updated", "created_at", "created_by"
    ]);
}

