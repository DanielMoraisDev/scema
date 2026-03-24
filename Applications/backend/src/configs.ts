import dotenv from "dotenv";
dotenv.config();

let POSTGRES_HOST = process.env.DB_POSTGRES_HOST;
let POSTGRES_PORT = process.env.DB_POSTGRES_PORT;
const POSTGRES_DB = process.env.DB_POSTGRES_DB;
const POSTGRES_PASSWORD = process.env.DB_POSTGRES_PASSWORD;
const POSTGRES_USER = process.env.DB_POSTGRES_USER;

const PASSWORD_JWT_ACCESS = process.env.PASSWORD_JWT_ACCESS;
const PASSWORD_JWT_REFRESH = process.env.PASSWORD_JWT_REFRESH;

const configs = {
  hosts: {
    postgres: {
      host: POSTGRES_HOST,
      port: POSTGRES_PORT,
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      user: POSTGRES_USER,
    },
  },
  auths: {
    token: {
      secret: {
        access: PASSWORD_JWT_ACCESS,
        refresh: PASSWORD_JWT_REFRESH,
      },
    },
  },
};

export default configs;
