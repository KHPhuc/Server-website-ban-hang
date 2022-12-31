import { query, queryOnject } from "../db";

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
  query(`SELECT * FROM ${table}`).then((res) => {
    result(null, res);
  });
};

Customer.register = (newCustomer: any, result: any) => {
  queryOnject(`INSERT INTO ${table} SET ?`, newCustomer)
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

export default Customer;
