"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.getAllForCustomers = exports.createOrder = exports.preCreateOrder = exports.receiveResult = void 0;
const order_model_1 = __importDefault(require("../../model/Order/order.model"));
const detail_order_1 = require("./detail_order");
const MoMo_1 = require("../../payment/Momo/MoMo");
const address_model_1 = __importDefault(require("../../model/address.model"));
const id_1 = require("../../utils/id");
const detail_order_model_1 = __importDefault(require("../../model/Order/detail_order.model"));
const cart_model_1 = __importDefault(require("../../model/cart.model"));
const prefix = "O";
const receiveResult = (req, res) => {
    // console.log(req.params);
    // console.log(req.body);
    if (req.body.resultCode === 0) {
        let order = {
            orderId: req.body.orderId,
            orderStatus: "Chuẩn bị hàng",
            paymentStatus: "Đã thanh toán",
        };
        order_model_1.default.update(order, (err, data) => { });
    }
    else if (req.body.resultCode === 1006) {
        let order = {
            orderId: req.body.orderId,
            orderStatus: "Đã hủy",
            paymentStatus: "Chưa thanh toán",
        };
        order_model_1.default.update(order, (err, data) => { });
    }
};
exports.receiveResult = receiveResult;
const getAll = (req, res) => {
    order_model_1.default.getAll((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            (0, detail_order_1.getAllFromOrder)(req, res, data);
        }
    });
};
exports.getAll = getAll;
const preCreateOrder = (req, res) => {
    var newOrder = new order_model_1.default(req.body);
    newOrder.orderId = (0, id_1.generateId)(prefix);
    if (req.body.addressId) {
        (0, exports.createOrder)(req, res, newOrder);
    }
    else {
        let newAddress = new address_model_1.default(req.body);
        address_model_1.default.findByAll(newAddress, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json();
            }
            else {
                if (data.length) {
                    newOrder.addressId = data[0].addressId;
                    (0, exports.createOrder)(req, res, newOrder);
                }
                else {
                    newAddress.addressId = (0, id_1.generateId)("A");
                    address_model_1.default.create(newAddress, (err, data) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json();
                        }
                        else {
                            newOrder.addressId = newAddress.addressId;
                            (0, exports.createOrder)(req, res, newOrder);
                        }
                    });
                }
            }
        });
    }
};
exports.preCreateOrder = preCreateOrder;
const createOrder = (req, res, newOrder) => {
    order_model_1.default.create(newOrder, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            var promises = req.body.listProduct.map((e) => {
                let newDetailOrder = new detail_order_model_1.default(e);
                newDetailOrder.orderId = newOrder.orderId;
                return new Promise((res, rej) => {
                    detail_order_model_1.default.create(newDetailOrder, (err, dt) => {
                        if (err) {
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
                cart_model_1.default.delete(newOrder.customerId, (err1, data1) => {
                    if (err1) {
                        console.log(err1);
                    }
                    else {
                    }
                });
                if (newOrder.paymentMethodId === "PM-02") {
                    (0, MoMo_1.makeMomo)(newOrder.totalMoney, newOrder.orderId)
                        .then((data) => {
                        res.status(200).json(data);
                    })
                        .catch((err) => {
                        console.log(err);
                        res.status(500).json();
                    });
                }
                else {
                    res.status(200).json(true);
                }
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json();
            });
        }
    });
};
exports.createOrder = createOrder;
const getAllForCustomers = (req, res) => {
    order_model_1.default.getAllForCustomer(req.body.customerId, req.body.page, req.body.orderStatus, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            (0, detail_order_1.getDetailForCustomer)(req, res, data);
        }
    });
};
exports.getAllForCustomers = getAllForCustomers;
