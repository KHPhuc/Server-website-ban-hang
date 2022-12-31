"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.getAll = void 0;
const customer_model_1 = __importDefault(require("../model/customer.model"));
const token_1 = require("../utils/token");
const id_1 = require("../utils/id");
const prefix = "C";
const getAll = (req, res) => {
    customer_model_1.default.getAll((err, data) => {
        res.json({ rs: data });
    });
};
exports.getAll = getAll;
const register = (req, res) => {
    const customer = new customer_model_1.default(req.body);
    customer.customerId = (0, id_1.generateId)(prefix);
    customer_model_1.default.register(customer, (err, data) => {
        if (err) {
            // console.log(err.code, err.sqlMessage);
            if (err.code === "ER_DUP_ENTRY") {
                if (err.sqlMessage.includes("phoneNumber")) {
                    res.status(500).json({ message: "Số điện thoại đã được sử dụng!" });
                }
                else if (err.sqlMessage.includes("email")) {
                    res.status(500).json({ message: "Email đã được sử dụng!" });
                }
            }
        }
        else {
            let token = (0, token_1.generateToken)(customer.customerId, req.body.phoneNumber);
            // res.setHeader('set-cookie', token)
            res.status(200).json({
                id: customer.customerId,
                username: req.body.phoneNumber,
                name: req.body.name,
                isAdmin: req.body.isAdmin ? true : false,
                token: token,
            });
        }
    });
};
exports.register = register;
const login = (req, res) => {
    customer_model_1.default.login(req.body.username, req.body.password, (err, data) => {
        if (err) {
            res.json(err);
        }
        else {
            if (data.length) {
                let token = (0, token_1.generateToken)(data.customerId, req.body.username);
                // console.log(token);
                res.cookie("token", token);
                // console.log(res);
                res.status(200).json({
                    id: data[0].customerId,
                    username: req.body.username,
                    name: data[0].name,
                    isAdmin: data[0].isAdmin === "true" ? true : false,
                    token: token,
                });
            }
            else {
                res.status(400).send("Invalid Credentials");
            }
        }
    });
};
exports.login = login;
