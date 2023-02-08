import { query, queryObject } from "../db";

const table = "customer";

const Customer = function (customer: any) {
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

Customer.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

Customer.register = (newCustomer: any, result: any) => {
  queryObject(`INSERT INTO ${table} SET ?`, newCustomer)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

Customer.login = (username: any, password: any, result: any) => {
  query(
    `SELECT * FROM ${table} WHERE (phoneNumber = '${username}' OR email = '${username}') AND password = '${password}'`
  )
    .then((res) => {
      // console.log("res ===> ", res);
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

Customer.changePassword = (newPassword: any, cId: any, result: any) => {
  queryObject(`UPDATE ${table} SET password=? WHERE customerId=?`, [
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

Customer.getInfo = (cId: any, result: any) => {
  queryObject(
    `SELECT customerId, name, phoneNumber, email, birthday, sex, addressId FROM ${table} WHERE customerId =?`,
    [cId]
  )
    .then((res: any) => {
      if (res[0].addressId) {
        queryObject(
          `SELECT address, ward, district, city FROM address WHERE addressId =?`,
          [res[0].addressId]
        )
          .then((res1: any) => {
            let mergd = { ...res[0], ...res1[0] };
            result(null, mergd);
          })
          .catch((err) => {
            result(err, null);
          });
      } else {
        result(null, res);
      }
    })
    .catch((err) => {
      result(err, null);
    });
};

Customer.updateInfo = (cId: any, customer: any, result: any) => {
  var query = `UPDATE ${table} SET`;

  for (const [key, value] of Object.entries(customer)) {
    if (value) {
      query += ` ${key}='${value}',`;
    }
  }

  query = query.substring(0, query.length - 1) + " WHERE customerId =?";

  queryObject(query, [cId])
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

Customer.getInfoAfterUpdate = (cId: any, result: any) => {
  query(`SELECT * FROM ${table} WHERE customerId = '${cId}'`)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

Customer.ban = (customerId: any, result: any) => {
  queryObject(`UPDATE ${table} SET ban=? WHERE customerId =?`, [
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

Customer.unBan = (customerId: any, result: any) => {
  queryObject(`UPDATE ${table} SET ban=? WHERE customerId =?`, [
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

export default Customer;
