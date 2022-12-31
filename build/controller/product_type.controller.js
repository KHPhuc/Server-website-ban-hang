"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getAll = void 0;
const product_type_model_1 = __importDefault(require("../model/product_type.model"));
const id_1 = require("../utils/id");
const prefix = "PT";
const getAll = (req, res) => {
    product_type_model_1.default.getAll((err, data) => {
        if (err) {
            res.status(500).json({});
            // res.status(500).json({ message: "Thêm thất bại" });
        }
        else {
            res.status(200).json(data);
        }
    });
};
exports.getAll = getAll;
const create = (req, res) => {
    const productType = new product_type_model_1.default(req.body);
    productType.productTypeId = (0, id_1.generateId)(prefix);
    product_type_model_1.default.create(productType, (err, data) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                if (err.sqlMessage.includes("productTypeNam")) {
                    res.status(500).json({ message: "Đã có danh mục!" });
                }
            }
        }
        else {
            // res.status(200).json(data);
            getAll(req, res);
        }
    });
};
exports.create = create;
const update = (req, res) => {
    const productType = new product_type_model_1.default(req.body);
    product_type_model_1.default.update(req.params.productTypeId, productType, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            // res.status(200).json(data);
            getAll(req, res);
        }
    });
};
exports.update = update;
const remove = (req, res) => {
    product_type_model_1.default.delete(req.params.productTypeId, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            // res.status(200).json(data);
            getAll(req, res);
        }
    });
};
exports.remove = remove;
