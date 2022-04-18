import { config, Connection, PoolOpts } from 'mssql';
import 'dotenv/config';

const poolConfig: PoolOpts<Connection> = {
  max: 10,
  min: 0,
  idleTimeoutMillis: 30000,
};

export const sqlConfig: config = {
  user: process.env.SERVER_USERNAME,
  password: process.env.SERVER_PASSWORD,
  database: process.env.SERVER_DATABASE,
  server: process.env.SERVER_URL as string,
  pool: poolConfig,
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};
