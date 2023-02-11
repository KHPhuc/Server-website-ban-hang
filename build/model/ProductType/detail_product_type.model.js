"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const table = "detail_product_type";
const DetailProductType = function (detailProductType) {
    this.detailPTId = detailProductType.detailPTId;
    this.detailPTName = detailProductType.detailPTName;
    this.productTypeId = detailProductType.productTypeId;
};
DetailProductType.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table}`).then((res) => {
        result(null, res);
    });
};
DetailProductType.getByDetailPTId = (id, result) => {
    (0, db_1.queryObject)(`SELECT * FROM ${table} WHERE detailPTId=?`, [id]).then((res) => {
        result(null, res);
    });
};
DetailProductType.getByProductTypeId = (id, result) => {
    (0, db_1.queryObject)(`SELECT * FROM ${table} WHERE productTypeId=?`, [id]).then((res) => {
        result(null, res);
    });
};
DetailProductType.create = (newDetailProductType, result) => {
    (0, db_1.queryObject)(`INSERT INTO ${table} SET?`, newDetailProductType)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
DetailProductType.update = (id, detailProductType, result) => {
    (0, db_1.queryObject)(`UPDATE ${table} SET detailPTName=? WHERE detailPTId=? `, [
        detailProductType.detailPTName,
        id,
    ])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
DetailProductType.remove = (id, result) => {
    (0, db_1.queryObject)(`DELETE FROM ${table} WHERE detailPTId=?`, [id])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
exports.default = DetailProductType;
