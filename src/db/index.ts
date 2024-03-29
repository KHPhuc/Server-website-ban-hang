import mysql from "mysql";
import { config } from "../config/config";

var connection = mysql.createConnection({
  password: config.dbPassword,
  user: config.dbUser,
  database: config.dbName,
  host: config.dbHost,
  port: 3306,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("✅ database: connected", config.dbHost);
  connection.query(
    `SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`
  );
});

const query = (query: string) => {
  return new Promise((res, rej) => {
    connection.query(query, (error, result) => {
      // if (error) throw error;
      if (error) {
        rej(error);
      } else {
        res(result);
      }
    });
  });
};

const queryObject = (query: string, object: any) => {
  return new Promise((res, rej) => {
    connection.query(query, object, (error, result) => {
      if (error) {
        rej(error);
      } else {
        res(result);
      }
    });
  });
};

export { query, queryObject };
