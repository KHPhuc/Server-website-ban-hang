import * as dotenv from "dotenv";
dotenv.config({
  path: `.env.deploy`,
});

const { PORT, DB_HOST, DB_USER, DB_PWD, DB_NAME, JWT_SECRET } = process.env;

export const config = {
  port: PORT,
  dbHost: DB_HOST,
  dbUser: DB_USER,
  dbPassword: DB_PWD,
  dbName: DB_NAME,
  jwt_secret: JWT_SECRET,
};
