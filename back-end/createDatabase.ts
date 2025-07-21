import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Парсим DATABASE_URL щоб дістати ім'я бази
const dbUrl = process.env.DATABASE_URL!;
const dbName = dbUrl.split('/').pop(); // 'chirp_db'

(async () => {
  // Підключаємось до дефолтної бази postgres
  const client = new Client({
    connectionString: dbUrl.replace(`/${dbName}`, '/postgres'),
  });

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname='${dbName}'`,
    );
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database '${dbName}' created`);
    } else {
      console.log(`Database '${dbName}' already exists`);
    }
  } catch (err) {
    console.error('Error creating database:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
})();
