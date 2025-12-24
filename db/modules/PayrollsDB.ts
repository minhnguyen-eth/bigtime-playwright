import { clearTable } from '../helpers/DBHelper';

export async function clearPayroll() {
    await clearTable('payrolls', "user_id not in ('EVMI6Dgbh7', 'gS8dKlPvCX', '8HSIZ7mOgQ')");
}
