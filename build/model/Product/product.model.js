"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const table = "product";
const Product = function (product) {
    this.productId = product.productId;
    this.productName = product.productName;
    this.linkProduct = product.linkProduct;
    this.detailPTId = product.detailPTId;
    this.description = product.description;
};
Product.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table} WHERE old = "false"`)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Product.findNameProduct = (name, result) => {
    (0, db_1.queryObject)(`SELECT * FROM ${table} WHERE productName = ? AND old = ?`, [
        name,
        "false",
    ])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Product.getDetailProduct = (name, result) => {
    (0, db_1.queryObject)(`SELECT * FROM ${table} INNER JOIN detail_product WHERE product.productId = detail_product.productId AND linkProduct = ? AND detail_product.old = ? AND quantity > 0`, [name, "false"])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Product.getAllWithDP = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table} WHERE old = "false" LIMIT `)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Product.create = (newProduct, result) => {
    (0, db_1.queryObject)(`INSERT INTO ${table} SET?`, newProduct)
        .then((res) => result(null, res))
        .catch((err) => result(err, null));
};
Product.update = (id, product, result) => {
    (0, db_1.queryObject)(`UPDATE ${table} SET productName=?, detailPTId=?, description=? WHERE productId=?`, [product.productName, product.detailPTId, product.description, id])
        .then((res) => result(null, res))
        .catch((err) => result(err, null));
};
Product.delete = (id, result) => {
    (0, db_1.queryObject)(`UPDATE ${table} SET old=? WHERE productId = ?`, ["true", id])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
exports.default = Product;
