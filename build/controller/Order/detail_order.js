"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFromOrder = exports.getDetailForCustomer = void 0;
const detail_order_model_1 = __importDefault(require("../../model/Order/detail_order.model"));
const getAllFromOrder = (req, res, data) => {
    var promises = data.map((e) => {
        return new Promise((res, rej) => {
            detail_order_model_1.default.getAllFromOrder(e.orderId, (err, dt) => {
                if (err) {
                    console.log(err);
                    rej(err);
                }
                else {
                    res(dt);
                }
            });
        }).then((res) => {
            e.detailOrder = res;
            return e;
        });
    });
    Promise.all(promises)
        .then((dt) => {
        // console.log(res);
        res.status(200).json(dt);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json();
    });
};
exports.getAllFromOrder = getAllFromOrder;
const getDetailForCustomer = (req, res, data) => {
    var promises = data.map((e) => {
        return new Promise((res, rej) => {
            detail_order_model_1.default.getDetail(e.orderId, (err, dt) => {
                if (err) {
                    console.log(err);
                    rej(err);
                }
                else {
                    res(dt);
                }
            });
        }).then((res) => {
            e.detailOrder = res;
            return e;
        });
    });
    Promise.all(promises)
        .then((dt) => {
        // console.log(res);
        res.status(200).json(dt);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json();
    });
};
exports.getDetailForCustomer = getDetailForCustomer;
