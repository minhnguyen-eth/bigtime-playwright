import { clearTable } from '../helpers/DBHelper';

export async function clearAllowanceTypes() {
    await clearTable('allowance_types', "name <> 'Phụ cấp tiền ăn'");
}
