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
  // dbUser: "kp23",
  // dbPassword: "kieuphuc23",
  dbUser: "root",
  dbPassword: "",
  dbName: "hoang_minh_shop",
  jwt_secret: "hoang_minh_shop",
  jwt_secret_admin: "hoang_minh_shop_admin",
  // front: "https://kieuphuc.tk",
  // back: "https://14.225.205.209:5000/api",
  front: "http://localhost:5173",
  back: "https://5e57-2402-800-62d2-d822-8db4-b459-7beb-81cc.ap.ngrok.io",
};
