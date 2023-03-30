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
  // dbHost: "localhost",
  // dbUser: "root",
  // dbPassword: "",
  dbHost: "14.225.205.209",
  dbUser: "kp",
  dbPassword: "kieuphuc",
  dbName: "hoang_minh_shop",
  jwt_secret: "hoang_minh_shop",
  jwt_secret_admin: "hoang_minh_shop_admin",
  front: "https://kieuphuc.tk",
  // back: "https://server-ban-hang.herokuapp.com" + "/api",
  back: "https://server-website-ban-hang.onrender.com" + "/api",
  // front: "http://localhost:5173",
  // back: "https://eb0e-222-252-22-251.ap.ngrok.io" + "/api",
};
