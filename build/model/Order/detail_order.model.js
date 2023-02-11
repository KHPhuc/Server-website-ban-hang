"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
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
DetailOrder.getAllFromOrder = (orderId, result) => {
    (0, db_1.query)(`SELECT * FROM ${table} INNER JOIN detail_product WHERE ${table}.detailProductId = detail_product.detailProductId AND orderId = "${orderId}"`)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
DetailOrder.create = (newDetailOrder, result) => {
    (0, db_1.queryObject)(`INSERT INTO ${table} SET?`, newDetailOrder)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
DetailOrder.getDetail = (orderId, result) => {
    (0, db_1.queryObject)(`SELECT orderID, detail_product.productId, detail_order.detailProductId, productName, image, color, size, originalPrice, currentPrice, detail_order.quantity FROM detail_order INNER JOIN detail_product, product WHERE detail_order.detailProductId = detail_product.detailProductId AND detail_product.productId = product.productId AND orderId = ?;`, [orderId])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
exports.default = DetailOrder;
