import { clearTable } from '../helpers/DBHelper';

export const clearEmployees = async () => {
    await clearTable('users', "name LIKE '%Automation test%' or name LIKE '%z%'");
}
