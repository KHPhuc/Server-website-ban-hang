"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getByProductTypeId = void 0;
const detail_product_type_model_1 = __importDefault(require("../model/detail_product_type.model"));
const id_1 = require("../utils/id");
const prefix = "DPT";
const getByProductTypeId = (req, res) => {
    detail_product_type_model_1.default.getByProductTypeId(req.params.productTypeId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            res.status(200).json(data);
        }
    });
};
exports.getByProductTypeId = getByProductTypeId;
const create = (req, res) => {
    const detailProductType = new detail_product_type_model_1.default(req.body);
    detailProductType.detailPTId = (0, id_1.generateId)(prefix);
    detail_product_type_model_1.default.create(detailProductType, (err, data) => {
        if (err) {
            //   res.status(500).json();
            console.log(err);
        }
        else {
            //   res.status(200).json(data);
            req.params.productTypeId = detailProductType.productTypeId;
            getByProductTypeId(req, res);
        }
    });
};
exports.create = create;
const update = (req, res) => {
    const detailProductType = new detail_product_type_model_1.default(req.body);
    detail_product_type_model_1.default.update(req.params.detailPTId, detailProductType, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            // res.status(200).json(data);
            detail_product_type_model_1.default.getByDetailPTId(req.params.detailPTId, (err, data) => {
                if (err) {
                }
                else {
                    req.params.productTypeId = data[0].productTypeId;
                    getByProductTypeId(req, res);
                }
            });
        }
    });
};
exports.update = update;
const remove = (req, res) => {
    detail_product_type_model_1.default.getByDetailPTId(req.params.detailPTId, (err, data) => {
        if (err) {
        }
        else {
            req.params.productTypeId = data[0].productTypeId;
        }
    });
    detail_product_type_model_1.default.remove(req.params.detailPTId, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            getByProductTypeId(req, res);
        }
    });
};
exports.remove = remove;
