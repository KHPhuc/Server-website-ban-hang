"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const table = "payment_method";
const PaymentMethod = function (paymentMethod) {
    this.paymentMethodId = paymentMethod.paymentMethodId;
    this.paymentMethodName = paymentMethod.paymentMethodName;
    this.description = paymentMethod.description;
    this.show = paymentMethod.show;
};
PaymentMethod.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table}`).then((res) => {
        result(null, res);
    });
};
exports.default = PaymentMethod;
