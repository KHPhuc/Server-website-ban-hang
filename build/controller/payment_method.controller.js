"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getAll = exports.getAllForUser = void 0;
const payment_method_model_1 = __importDefault(require("../model/payment_method.model"));
const prefix = "PM";
const getAllForUser = (req, res) => {
    payment_method_model_1.default.getAllForUser((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            res.status(200).json(data);
        }
    });
};
exports.getAllForUser = getAllForUser;
const getAll = (req, res) => {
    payment_method_model_1.default.getAll((err, data) => {
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
const update = (req, res) => {
    let paymentMethod = new payment_method_model_1.default(req.body);
    payment_method_model_1.default.update(req.params.paymentId, paymentMethod, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            getAll(req, res);
        }
    });
};
exports.update = update;
