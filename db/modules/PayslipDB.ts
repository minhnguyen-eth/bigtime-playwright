import { clearTable } from '../helpers/DBHelper';

export async function clearPayslips() {
    await clearTable('payslips', "paysheet_id NOT LIKE '%testData%'");
}
