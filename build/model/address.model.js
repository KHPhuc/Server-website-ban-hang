"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const table = "address";
const Address = function (address) {
    this.addressId = address.addressId;
    this.address = address.address;
    this.ward = address.ward;
    this.district = address.district;
    this.city = address.city;
    this.name = address.name;
    this.phoneNumber = address.phoneNumber;
};
Address.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table}`).then((res) => {
        result(null, res);
    });
};
exports.default = Address;
