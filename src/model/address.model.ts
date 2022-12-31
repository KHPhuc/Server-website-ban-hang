import {query} from "../db";

const table = "address";

const Address = function (address: any) {
  this.addressId = address.addressId;
  this.address = address.address;
  this.ward = address.ward;
  this.district = address.district;
  this.city = address.city;
  this.name = address.name;
  this.phoneNumber = address.phoneNumber;
};

Address.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`).then((res) => {
    result(null, res);
  });
};

export default Address;
