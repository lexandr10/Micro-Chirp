import {Knex} from "knex"

import dotenv from "dotenv"

dotenv.config();

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