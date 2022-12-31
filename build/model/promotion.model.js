"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const table = "promotion";
const Promotion = function (promotion) {
    this.promotionCode = promotion.promotionCode;
    this.description = promotion.description;
    this.startDate = promotion.startDate;
    this.endDate = promotion.endDate;
};
Promotion.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table}`).then((res) => {
        result(null, res);
    });
};
exports.default = Promotion;
