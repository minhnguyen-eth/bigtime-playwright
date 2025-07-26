import { clearTable } from '../helpers/DBHelper';

export const clearLeaveManagements = async () => {
    await clearTable('leave_managements', "year NOT LIKE '%2024%'");
}
