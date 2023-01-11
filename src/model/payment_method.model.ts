import { query, queryObject } from "../db";

const table = "payment_method";

const PaymentMethod = function (paymentMethod: any) {
  this.paymentMethodId = paymentMethod.paymentMethodId;
  this.paymentMethodName = paymentMethod.paymentMethodName;
  this.description = paymentMethod.description;
  this.status = paymentMethod.status;
};

PaymentMethod.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`).then((res) => {
    result(null, res);
  });
};

PaymentMethod.update = (id: any, paymentMethod: any, result: any) => {
  queryObject(`UPDATE ${table} SET status=? WHERE paymentMethodId=?`, [
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

export default PaymentMethod;
