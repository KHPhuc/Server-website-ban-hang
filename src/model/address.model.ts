import { query, queryObject } from "../db";

const table = "address";

const Address = function (address: any) {
  this.addressId = address.addressId;
  this.address = address.address;
  this.ward = address.ward;
  this.district = address.district;
  this.city = address.city;
  this.name = address.name;
  this.phoneNumber = address.phoneNumber;
  this.email = address.email;
};

Address.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`).then((res) => {
    result(null, res);
  });
};

Address.getByCId = (cId: any, result: any) => {
  queryObject(
    `SELECT * FROM customer INNER JOIN ${table} WHERE customer.addressId = address.addressId AND customerId=?`,
    cId
  )
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

Address.create = (newAddress: any, result: any) => {
  queryObject(`INSERT INTO ${table} SET?`, newAddress)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

Address.findByAll = (address: any, result: any) => {
  queryObject(
    `SELECT * FROM ${table} WHERE address=? AND ward=? AND district=? AND city=? AND name=? AND phoneNumber=? AND email=?`,
    [
      address.address,
      address.ward,
      address.district,
      address.city,
      address.name,
      address.phoneNumber,
      address.email,
    ]
  )
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

export default Address;
