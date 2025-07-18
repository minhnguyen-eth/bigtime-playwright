import { clearTable } from '../helpers/DBHelper';

export async function clearEmployees() {
    await clearTable('users', "name LIKE '%Automation test%' or name LIKE '%z%'");
}
