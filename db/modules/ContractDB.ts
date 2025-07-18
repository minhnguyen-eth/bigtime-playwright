import { checkExistsWithConditions, clearTable } from '../helpers/DBHelper';

// check exists in db
export async function checkContractExists(note: string, type: number, status: number) {
  return checkExistsWithConditions('employment_contracts', {
    note: { value: note, like: true },
    type: { value: type },
    status: { value: status }
  });
}

// clear data 
export const clearEmploymentContract = async () => {
    await clearTable('employment_contracts');
}
