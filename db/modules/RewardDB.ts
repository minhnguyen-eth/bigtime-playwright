import { clearTable } from '../helpers/DBHelper';

export async function clearRewardUsers() {
    await clearTable('reward_users', "name NOT LIKE '%Test data%'");
}

export async function clearRewardType() {
    await clearTable('reward_types', "name NOT LIKE '%Khen thưởng%'");
}