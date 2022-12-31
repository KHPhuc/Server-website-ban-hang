"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
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
exports.default = DetailProduct;
