"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const table = "customer";
const Customer = function (customer) {
    this.customerId = customer.customerId;
    this.name = customer.name;
    this.phoneNumber = customer.phoneNumber;
    this.email = customer.email;
    this.birthday = customer.birthday;
    this.sex = customer.sex;
    this.password = customer.password;
    this.isAdmin = customer.isAdmin;
    this.addressId = customer.addressId;
};
Customer.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table}`).then((res) => {
        result(null, res);
    });
};
Customer.register = (newCustomer, result) => {
    (0, db_1.queryObject)(`INSERT INTO ${table} SET ?`, newCustomer)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Customer.login = (username, password, result) => {
    (0, db_1.query)(`SELECT * FROM ${table} WHERE (phoneNumber = '${username}' OR email = '${username}') AND password = '${password}'`)
        .then((res) => {
        // console.log("res ===> ", res);
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
exports.default = Customer;
