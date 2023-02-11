"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const table = "promotion";
const Promotion = function (promotion) {
    this.promotionId = promotion.promotionId;
    this.promotionCode = promotion.promotionCode;
    this.description = promotion.description;
    this.startDate = promotion.startDate;
    this.endDate = promotion.endDate;
    this.times = promotion.times;
    this.used = promotion.used;
    this.minimum = promotion.minimum;
    this.sale = promotion.sale;
};
Promotion.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table} WHERE old = "false"`).then((res) => {
        result(null, res);
    });
};
Promotion.getByCode = (id, result) => {
    (0, db_1.queryObject)(`SELECT * FROM ${table} WHERE promotionCode = ? AND old = ?`, [
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
Promotion.create = (newPromotion, result) => {
    (0, db_1.queryObject)(`INSERT INTO ${table} SET?`, newPromotion)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Promotion.update = (id, promotion, result) => {
    (0, db_1.queryObject)(`UPDATE ${table} SET description=?, startDate=?, endDate=?, times=?, minimum=? WHERE promotionId=?`, [
        promotion.description,
        promotion.startDate,
        promotion.endDate,
        promotion.times,
        promotion.minimum,
        id,
    ])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Promotion.delete = (id, result) => {
    (0, db_1.queryObject)(`UPDATE ${table} SET old=? WHERE promotionId=?`, ["true", id])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
exports.default = Promotion;
