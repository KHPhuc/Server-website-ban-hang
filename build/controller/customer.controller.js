"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unBan = exports.ban = exports.create = exports.register = exports.login = exports.getAll = exports.changePassword = exports.updateInfo = exports.getInfo = void 0;
const customer_model_1 = __importDefault(require("../model/customer.model"));
const token_1 = require("../utils/token");
const id_1 = require("../utils/id");
const address_model_1 = __importDefault(require("../model/address.model"));
const prefix = "C";
const getAll = (req, res) => {
    customer_model_1.default.getAll((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            res.status(200).json(data);
        }
    });
};
exports.getAll = getAll;
const create = (req, res) => {
    const newCustomer = new customer_model_1.default(req.body);
    newCustomer.customerId = (0, id_1.generateId)(prefix);
    customer_model_1.default.register(newCustomer, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            getAll(req, res);
        }
    });
};
exports.create = create;
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
            res.cookie("token", token, {
                sameSite: "none",
                secure: true,
            });
            res.status(200).json({
                id: customer.customerId,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                name: req.body.name,
                isAdmin: req.body.isAdmin === "true" ? true : false,
                addressId: null,
                // token: token,
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
                res.cookie("token", token, {
                    sameSite: "none",
                    secure: true,
                });
                // console.log(res);
                res.status(200).json({
                    id: data[0].customerId,
                    phoneNumber: data[0].phoneNumber,
                    email: data[0].email,
                    name: data[0].name,
                    isAdmin: data[0].isAdmin === "true" ? true : false,
                    addressId: data[0],
                    // token: token,
                });
            }
            else {
                res.status(400).send("Invalid Credentials");
            }
        }
    });
};
exports.login = login;
const getInfo = (req, res) => {
    customer_model_1.default.getInfo(req.params.customerId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            res.status(200).json(data);
        }
    });
};
exports.getInfo = getInfo;
const updateInfo = (req, res) => {
    if (req.body.name) {
        let newAddress = new address_model_1.default(req.body);
        newAddress.addressId = (0, id_1.generateId)("A");
        address_model_1.default.create(newAddress, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json();
            }
            else {
                let customer = new customer_model_1.default(req.body);
                customer.addressId = newAddress.addressId;
                customer_model_1.default.updateInfo(req.params.customerId, customer, (err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json();
                    }
                    else {
                        customer_model_1.default.getInfoAfterUpdate(req.params.customerId, (err, data) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json();
                            }
                            else {
                                res.status(200).json({
                                    id: data[0].customerId,
                                    phoneNumber: data[0].phoneNumber,
                                    email: data[0].email,
                                    name: data[0].name,
                                    isAdmin: data[0].isAdmin === "true" ? true : false,
                                    addressId: data[0].addressId,
                                    // token: token,
                                });
                            }
                        });
                    }
                });
            }
        });
    }
    else {
        let customer = new customer_model_1.default(req.body);
        customer_model_1.default.updateInfo(req.params.customerId, customer, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json();
            }
            else {
                res.status(200).json();
            }
        });
    }
};
exports.updateInfo = updateInfo;
const changePassword = (req, res) => {
    customer_model_1.default.changePassword(req.body.newPassword, req.body.customerId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            res.status(200).json();
        }
    });
};
exports.changePassword = changePassword;
const ban = (req, res) => {
    customer_model_1.default.ban(req.params.customerId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            getAll(req, res);
        }
    });
};
exports.ban = ban;
const unBan = (req, res) => {
    customer_model_1.default.unBan(req.params.customerId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            getAll(req, res);
        }
    });
};
exports.unBan = unBan;
