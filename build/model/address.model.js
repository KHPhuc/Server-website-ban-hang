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
    this.email = address.email;
};
Address.getAll = (result) => {
    (0, db_1.query)(`SELECT * FROM ${table}`).then((res) => {
        result(null, res);
    });
};
Address.getByCId = (cId, result) => {
    (0, db_1.queryObject)(`SELECT * FROM customer INNER JOIN ${table} WHERE customer.addressId = address.addressId AND customerId=?`, cId)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Address.create = (newAddress, result) => {
    (0, db_1.queryObject)(`INSERT INTO ${table} SET?`, newAddress)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Address.findByAll = (address, result) => {
    (0, db_1.queryObject)(`SELECT * FROM ${table} WHERE address=? AND ward=? AND district=? AND city=? AND name=? AND phoneNumber=? AND email=?`, [
        address.address,
        address.ward,
        address.district,
        address.city,
        address.name,
        address.phoneNumber,
        address.email,
    ])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
exports.default = Address;
