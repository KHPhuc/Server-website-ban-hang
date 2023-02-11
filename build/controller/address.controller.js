"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddress = exports.get = void 0;
const address_model_1 = __importDefault(require("../model/address.model"));
const prefix = "A";
const get = (req, res) => {
    address_model_1.default.getByCId(req.params.customerId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            res.status(200).json(data);
        }
    });
};
exports.get = get;
const createAddress = (req, res) => {
};
exports.createAddress = createAddress;
