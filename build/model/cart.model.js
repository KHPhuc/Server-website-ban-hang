"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const table = "cart";
const Cart = function (cart) {
    this.customerId = cart.customerId;
    this.detailProductId = cart.detailProductId;
    this.quantity = cart.quantity;
};
Cart.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table}`).then((res) => {
        result(null, res);
    });
};
exports.default = Cart;
