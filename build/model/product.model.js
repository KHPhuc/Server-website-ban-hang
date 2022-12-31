"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const table = "product";
const Product = function (product) {
    this.productId = product.productId;
    this.productName = product.productName;
    this.detailPTName = product.detailPTName;
    this.description = product.description;
};
Product.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table}`)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
exports.default = Product;
