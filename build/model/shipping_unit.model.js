"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const table = "shipping_unit";
const ShippingUnit = function (shippingUnit) {
    this.shippingUnitId = shippingUnit.shippingUnitId;
    this.shippingUnitName = shippingUnit.shippingUnitName;
    this.description = shippingUnit.description;
};
ShippingUnit.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table}`).then((res) => {
        result(null, res);
    });
};
exports.default = ShippingUnit;
