import { clearTable } from '../helpers/DBHelper';

export async function clearLeaveManagements() {
    await clearTable('leave_managements', "year NOT LIKE '%2024%'");
}
