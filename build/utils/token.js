"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generateToken = (customerId, username) => {
    return jsonwebtoken_1.default.sign({
        customerId: customerId,
        username: username,
    }, `${config_1.config.jwt_secret}`, {
        expiresIn: "3d",
    });
};
exports.generateToken = generateToken;
const authToken = (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    jsonwebtoken_1.default.verify(token, `${config_1.config.jwt_secret}`, (err, decoded) => {
        if (err) {
            return res.status(401).send("Invalid Token");
        }
        else {
            return next();
        }
    });
};
exports.authToken = authToken;
