import { executeQuery, checkExistsWithConditions, clearTable } from '../helpers/DBHelper';
import mysql from 'mysql2/promise';

export const checkEvaluationTypeExists = async (name: string) => {
  return checkExistsWithConditions('evaluation_types', {
    name: { value: name, like: true }
  });
}

export const deleteEvaluationType = async (name: string) => {
  const result = await executeQuery("DELETE FROM evaluation_types WHERE name LIKE ?", [`%${name}%`]) as mysql.ResultSetHeader;
  console.info(`Deleted ${result.affectedRows} rows from evaluation_types where name like '${name}'`);
  return result.affectedRows > 0;
}

export const clearEluationTypes = async () => {
  await clearTable('evaluation_types', "name NOT LIKE '%Đánh giá%'");
}

export const clearEvaluationCriterias = async () => {
  await clearTable('evaluation_criterias', "name NOT LIKE '%Tiêu chí%'");
}

export const clearEvaluationProgress = async () => {
  await clearTable('evaluation_progress', "id NOT LIKE '%Testdata%'");
}
