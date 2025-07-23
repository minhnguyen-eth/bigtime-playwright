import { clearTable } from '../helpers/DBHelper';

export async function clearAllowanceTypes() {
    await clearTable('allowance_types', "name NOT LIKE '%Phụ cấp tiền ăn%'");
}
