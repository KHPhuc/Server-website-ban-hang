"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const table = "detail_product";
const DetailProduct = function (detailProduct) {
    this.detailProductId = detailProduct.detailProductId;
    this.productId = detailProduct.productId;
    this.image = detailProduct.image;
    this.color = detailProduct.color;
    this.size = detailProduct.size;
    this.quantity = detailProduct.quantity;
    this.originalPrice = detailProduct.originalPrice;
    this.currentPrice = detailProduct.currentPrice;
};
DetailProduct.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table}`).then((res) => {
        result(null, res);
    });
};
DetailProduct.getAllWithProductId = (id, result) => {
    (0, db_1.queryObject)(`SELECT * FROM ${table} WHERE productId=? AND old = ?`, [
        id,
        "false",
    ])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
DetailProduct.getAllToShow = (page, result) => {
    (0, db_1.query)(`SELECT * FROM ${table} INNER JOIN product WHERE detail_product.productId = product.productId AND detail_product.old = "false" AND quantity > 0 GROUP BY color, detail_product.productId LIMIT ${page * 20}, 20`)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
DetailProduct.getFollowDetailPT = (id, result) => {
    (0, db_1.query)(`SELECT * FROM product INNER JOIN ${table} WHERE detail_product.productId = product.productId AND detailPTId = "${id}" AND detailProductId IN (SELECT detailProductId FROM ${table} WHERE old = "false" AND quantity > 0 GROUP BY color, productId) GROUP BY color, detail_product.productId`)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
DetailProduct.create = (newDetailProduct, result) => {
    (0, db_1.queryObject)(`INSERT INTO ${table} SET?`, newDetailProduct)
        .then((res) => result(null, res))
        .catch((err) => result(err, null));
};
DetailProduct.update = (id, detailProduct, result) => {
    (0, db_1.queryObject)(`UPDATE ${table} SET image=? WHERE detailProductId=? `, [
        detailProduct.image,
        id,
    ])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
DetailProduct.deleteFromProduct = (id, result) => {
    (0, db_1.queryObject)(`UPDATE ${table} SET old=? WHERE productId = ?`, ["true", id])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        // result(err, null);
    });
};
DetailProduct.delete = (id, result) => {
    (0, db_1.queryObject)(`UPDATE ${table} SET old=? WHERE detailProductId = ?`, [
        "true",
        id,
    ])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        // result(err, null);
    });
};
exports.default = DetailProduct;
