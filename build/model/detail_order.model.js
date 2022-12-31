"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const table = "detail_order";
const DetailOrder = function (detailOrder) {
    this.orderId = detailOrder.orderId;
    this.detailProductId = detailOrder.detailProductId;
    this.quantity = detailOrder.quantity;
};
DetailOrder.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table}`).then((res) => {
        result(null, res);
    });
};
exports.default = DetailOrder;
