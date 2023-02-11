"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.updateAndDelete = exports.update = exports.create = exports.getAll = void 0;
const promotion_model_1 = __importDefault(require("../model/promotion.model"));
const id_1 = require("../utils/id");
const prefix = "PR";
const getAll = (req, res) => {
    promotion_model_1.default.getAll((err, data) => {
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
    let newPromotion = new promotion_model_1.default(req.body);
    newPromotion.promotionId = (0, id_1.generateId)(prefix);
    promotion_model_1.default.getByCode(newPromotion.promotionCode, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            if (data.length) {
                res.status(500).json({ message: "Trùng mã giảm giá" });
            }
            else {
                promotion_model_1.default.create(newPromotion, (err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json();
                    }
                    else {
                        getAll(req, res);
                    }
                });
            }
        }
    });
};
exports.create = create;
const update = (req, res) => {
    let promotion = new promotion_model_1.default(req.body);
    promotion_model_1.default.update(req.params.promotionId, promotion, (err, data) => {
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
const updateAndDelete = (req, res) => {
    let newPromotion = new promotion_model_1.default(req.body);
    newPromotion.promotionId = (0, id_1.generateId)(prefix);
    promotion_model_1.default.delete(req.params.promotionId, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            promotion_model_1.default.create(newPromotion, (err, data) => {
                if (err) {
                    res.status(500).json();
                }
                else {
                    getAll(req, res);
                }
            });
        }
    });
};
exports.updateAndDelete = updateAndDelete;
const remove = (req, res) => {
    promotion_model_1.default.delete(req.params.promotionId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            getAll(req, res);
        }
    });
};
exports.remove = remove;
