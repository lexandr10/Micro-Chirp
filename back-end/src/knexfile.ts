import {Knex} from "knex"

import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/migrations',
    },
  },
};


export default config;

module.exports = config;