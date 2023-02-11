"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deteleCart = exports.updateCart = exports.addCart = exports.getDetailCartById = exports.getByCId = void 0;
const cart_model_1 = __importDefault(require("../model/cart.model"));
const getByCId = (req, res) => {
    cart_model_1.default.getById(req.params.customerId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            res.status(200).json(data);
        }
    });
};
exports.getByCId = getByCId;
const getAll = (req, res, id) => {
    cart_model_1.default.getById(id, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json;
        }
        else {
            res.status(200).json(data);
        }
    });
};
const getDetailCartById = (req, res) => {
    cart_model_1.default.getDetailCartById(req.params.customerId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            res.status(200).json(data);
        }
    });
};
exports.getDetailCartById = getDetailCartById;
const addCart = (req, res) => {
    const newCart = new cart_model_1.default(req.body);
    cart_model_1.default.findByCIdAndDPId(newCart.customerId, newCart.detailProductId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            if (data.length) {
                const q = data[0].quantity + newCart.quantity;
                const cart = new cart_model_1.default(req.body);
                cart.quantity = q;
                cart_model_1.default.update(cart, (err1, data1) => {
                    if (err1) {
                        console.log(err1);
                        res.status(500).json();
                    }
                    else {
                        getAll(req, res, cart.customerId);
                    }
                });
            }
            else {
                cart_model_1.default.create(newCart, (err2, data2) => {
                    if (err2) {
                        console.log(err2);
                        res.status(500).json();
                    }
                    else {
                        // res.status(200).json();
                        getAll(req, res, newCart.customerId);
                    }
                });
            }
        }
    });
};
exports.addCart = addCart;
const updateCart = (req, res) => {
    let cart = new cart_model_1.default(req.body);
    cart_model_1.default.update(cart, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            // getAll(req, res, cart.customerId);
            req.params.customerId = cart.customerId;
            (0, exports.getDetailCartById)(req, res);
        }
    });
};
exports.updateCart = updateCart;
const deteleCart = (req, res) => {
    cart_model_1.default.deleteProduct(req.body.customerId, req.body.detailProductId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            req.params.customerId = req.body.customerId;
            (0, exports.getDetailCartById)(req, res);
        }
    });
};
exports.deteleCart = deteleCart;
