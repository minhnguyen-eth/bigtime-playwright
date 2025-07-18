import { checkExistsWithConditions, clearTable, executeQuery } from '../helpers/DBHelper';

export async function checkLeaveApplicationExists(reason: string, status?: number) {
  const conditions: Record<string, { value: any; like?: boolean }> = {
    reason: { value: reason, like: true }
  };
  if (status !== undefined) {
    conditions.status = { value: status };
  }
  return checkExistsWithConditions('leave_applications', conditions);
}

export async function clearLeaveApplications() {
  await clearTable('leave_applications', "reason NOT LIKE '%Test data%'");
}

export async function clearLeaveApplicationsForUser(userId: string) {
    await executeQuery("DELETE FROM leave_applications WHERE user_id = ?", [userId]);
    console.info(`Cleared leave applications for user_id ${userId}`);
}
