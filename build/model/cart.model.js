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
Cart.getDetailCartById = (id, result) => {
    (0, db_1.queryObject)(`SELECT product.productId, productName, cart.detailProductId, image, color, size, cart.quantity, currentPrice, originalPrice, detail_product.quantity as kho, linkProduct FROM ${table} INNER JOIN detail_product, product WHERE cart.detailProductId = detail_product.detailProductId AND detail_product.productId = product.productId AND customerId = ?`, id)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Cart.getById = (id, result) => {
    (0, db_1.queryObject)(`SELECT * FROM ${table} WHERE customerId = ?`, id)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(null, err);
    });
};
Cart.findByCIdAndDPId = (Cid, DPid, result) => {
    (0, db_1.queryObject)(`SELECT * FROM ${table} WHERE customerId = ? AND detailProductId = ?`, [Cid, DPid])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(null, err);
    });
};
Cart.create = (newCart, result) => {
    (0, db_1.queryObject)(`INSERT INTO ${table} SET?`, newCart)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Cart.update = (cart, result) => {
    (0, db_1.queryObject)(`UPDATE ${table} SET quantity = ? WHERE customerId = ? AND detailProductId = ?`, [cart.quantity, cart.customerId, cart.detailProductId])
        .then((res) => result(null, res))
        .catch((err) => result(err, null));
};
Cart.deleteProduct = (cId, dpId, result) => {
    (0, db_1.queryObject)(`DELETE FROM ${table} WHERE customerId = ? AND detailProductId = ? `, [cId, dpId])
        .then((res) => result(null, res))
        .catch((err) => result(err, null));
};
Cart.delete = (cId, result) => {
    (0, db_1.queryObject)(`DELETE FROM ${table} WHERE customerId = ?`, cId)
        .then((res) => result(null, res))
        .catch((err) => result(err, null));
};
exports.default = Cart;
