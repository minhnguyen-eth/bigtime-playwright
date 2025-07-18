import { clearTable } from '../helpers/DBHelper';

export async function clearPaysheets() {
    await clearTable('paysheets');
}
