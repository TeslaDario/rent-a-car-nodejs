import sql, { ConnectionPool, IResult } from 'mssql';
import { sqlConfig } from '../config';

const appPool = new sql.ConnectionPool(sqlConfig, (err) => {
  if (err) {
    console.log('Connection Failed');
    throw err;
  }

  console.log('Connected on DB!');
});

// run a query against the global connection pool
async function runQuery(query: string): Promise<IResult<any>> {
  // sql.connect() will return the existing global pool if it exists or create a new one if it doesn't
  const pool: ConnectionPool = await appPool.connect();
  return await pool.query(query);
}

/** Execute query */
export function executeStatement(query: string): Promise<{ success: boolean; data: string }> {
  return new Promise(async (resolve) => {
    try {
      const result = await runQuery(query);
      console.log('Request success:', result.recordset.length, ' rows');
      resolve({ success: true, data: JSON.stringify(result.recordset) });
    } catch (err) {
      console.log('Request failed:', err);
      resolve({ success: false, data: JSON.stringify([]) });
    }
  });
}
