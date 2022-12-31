"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const product_model_1 = __importDefault(require("../model/product.model"));
const getAll = (req, res) => {
    product_model_1.default.getAll((err, data) => {
        if (err) {
            res.status(500).json({ message: "Lấy thất bại" });
        }
        else {
            res.status(200).json(data);
        }
    });
};
exports.getAll = getAll;
