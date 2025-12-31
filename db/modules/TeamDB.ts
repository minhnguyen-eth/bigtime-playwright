import { checkExistsWithConditions, clearTable } from '../helpers/DBHelper';

export async function clearTeam() {
    await clearTable('teams', "name NOT LIKE '%Nhóm%'");
}

export async function checkTeamExists(name: string) {
    return checkExistsWithConditions('teams', {
        name: { value: name, like: true }
    });
}