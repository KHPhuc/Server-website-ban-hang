import * as dotenv from "dotenv";
dotenv.config({
  // path: `.env.product`,
  path: `.env.dev`,
});

const {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PWD,
  DB_NAME,
  JWT_SECRET,
  FRONTEND,
  BACKEND,
} = process.env;

// export const config = {
//   port: PORT,
//   dbHost: DB_HOST,
//   dbUser: DB_USER,
//   dbPassword: DB_PWD,
//   dbName: DB_NAME,
//   jwt_secret: JWT_SECRET,
//   front: FRONTEND,
//   back: BACKEND,
// };

export const config = {
  port: 5000,
  dbHost: "localhost",
  dbUser: "kp23",
  dbPassword: "kieuphuc23",
  // dbUser: "root",
  // dbPassword: "",
  dbName: "hoang_minh_shop",
  jwt_secret: "hoang_minh_shop",
  front: "https://kieuphuc.tk",
  back: "https://14.225.205.209:5000/api",
};
