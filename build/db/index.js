"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryObject = exports.query = void 0;
const mysql_1 = __importDefault(require("mysql"));
const config_1 = require("../config/config");
var connection = mysql_1.default.createConnection({
    password: config_1.config.dbPassword,
    user: config_1.config.dbUser,
    database: config_1.config.dbName,
    host: config_1.config.dbHost,
    port: 3306,
});
connection.connect((err) => {
    if (err)
        throw err;
    console.log("✅ database: connected", config_1.config.dbHost);
});
const query = (query) => {
    return new Promise((res, rej) => {
        connection.query(query, (error, result) => {
            // if (error) throw error;
            if (error) {
                rej(error);
            }
            else {
                res(result);
            }
        });
    });
};
exports.query = query;
const queryObject = (query, object) => {
    return new Promise((res, rej) => {
        connection.query(query, object, (error, result) => {
            if (error) {
                rej(error);
            }
            else {
                res(result);
            }
        });
    });
};
exports.queryObject = queryObject;
