"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const table = "product_type";
const ProductType = function (productType) {
    this.productTypeId = productType.productTypeId;
    this.productTypeName = productType.productTypeName;
};
ProductType.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table}`)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
ProductType.create = (newProductType, result) => {
    (0, db_1.queryObject)(`INSERT INTO ${table} SET ?`, newProductType)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
ProductType.update = (id, productType, result) => {
    (0, db_1.queryObject)(`UPDATE ${table} SET productTypeName = ? WHERE productTypeId = ?`, [productType.productTypeName, id])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
ProductType.delete = (id, result) => {
    (0, db_1.queryObject)(`DELETE FROM ${table} WHERE productTypeId = ?`, id)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
exports.default = ProductType;
