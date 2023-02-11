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
    (0, db_1.query)(`SELECT * FROM ${table}`)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
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
Customer.changePassword = (newPassword, cId, result) => {
    (0, db_1.queryObject)(`UPDATE ${table} SET password=? WHERE customerId=?`, [
        newPassword,
        cId,
    ])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Customer.getInfo = (cId, result) => {
    (0, db_1.queryObject)(`SELECT customerId, name, phoneNumber, email, birthday, sex, addressId FROM ${table} WHERE customerId =?`, [cId])
        .then((res) => {
        if (res[0].addressId) {
            (0, db_1.queryObject)(`SELECT address, ward, district, city FROM address WHERE addressId =?`, [res[0].addressId])
                .then((res1) => {
                let mergd = Object.assign(Object.assign({}, res[0]), res1[0]);
                result(null, mergd);
            })
                .catch((err) => {
                result(err, null);
            });
        }
        else {
            result(null, res);
        }
    })
        .catch((err) => {
        result(err, null);
    });
};
Customer.updateInfo = (cId, customer, result) => {
    var query = `UPDATE ${table} SET`;
    for (const [key, value] of Object.entries(customer)) {
        if (value) {
            query += ` ${key}='${value}',`;
        }
    }
    query = query.substring(0, query.length - 1) + " WHERE customerId =?";
    (0, db_1.queryObject)(query, [cId])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Customer.getInfoAfterUpdate = (cId, result) => {
    (0, db_1.query)(`SELECT * FROM ${table} WHERE customerId = '${cId}'`)
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Customer.ban = (customerId, result) => {
    (0, db_1.queryObject)(`UPDATE ${table} SET ban=? WHERE customerId =?`, [
        "true",
        customerId,
    ])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
Customer.unBan = (customerId, result) => {
    (0, db_1.queryObject)(`UPDATE ${table} SET ban=? WHERE customerId =?`, [
        "false",
        customerId,
    ])
        .then((res) => {
        result(null, res);
    })
        .catch((err) => {
        result(err, null);
    });
};
exports.default = Customer;
