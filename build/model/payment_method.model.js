"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const table = "payment_method";
const PaymentMethod = function (paymentMethod) {
    this.paymentMethodId = paymentMethod.paymentMethodId;
    this.paymentMethodName = paymentMethod.paymentMethodName;
    this.description = paymentMethod.description;
    this.status = paymentMethod.status;
};
PaymentMethod.getAllForUser = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table} WHERE status = 'true'`)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
PaymentMethod.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table}`).then((res) => {
        result(null, res);
    });
};
PaymentMethod.update = (id, paymentMethod, result) => {
    (0, db_1.queryObject)(`UPDATE ${table} SET status=? WHERE paymentMethodId=?`, [
        paymentMethod.status,
        id,
    ])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
exports.default = PaymentMethod;
