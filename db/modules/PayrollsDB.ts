import { clearTable, importFromCSV } from '../helpers/DBHelper';

export async function clearPayroll() {
    await clearTable('payrolls');
}

export async function importPayrolls() {
    await importFromCSV("payrolls.csv", "payrolls", [
        "id", "user_id",
        "day", "total_hours",
        "total_overtimes", "status",
        "created_at", "created_by", "updated_at",
        "updated_by", "deleted_at", "deleted_by"
    ]);

}