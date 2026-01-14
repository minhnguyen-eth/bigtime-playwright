import { clearTable } from '../helpers/DBHelper';

export async function clearDependents() {
    await clearTable('user_family_members', "user_id = 'minh'");
}
