"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const table = "order";
const Order = function (order) {
    this.orderId = order.orderId;
    this.customerId = order.customerId;
    this.addressId = order.addressId;
    this.totalMoney = order.totalMoney;
    this.orderDate = order.orderDate;
    this.orderStatus = order.orderStatus;
    this.promotionCode = order.promotionCode;
    this.paymentMethodId = order.paymentMethodId;
    this.paymentStatus = order.paymentStatus;
    this.shippingUnitId = order.shippingUnitId;
};
Order.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table}`).then((res) => {
        result(null, res);
    });
};
exports.default = Order;
