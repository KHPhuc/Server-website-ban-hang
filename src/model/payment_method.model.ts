import { query, queryObject } from "../db";

const table = "payment_method";

const PaymentMethod = function (paymentMethod: any) {
  this.paymentMethodId = paymentMethod.paymentMethodId;
  this.paymentMethodName = paymentMethod.paymentMethodName;
  this.description = paymentMethod.description;
  this.status = paymentMethod.status;
};

PaymentMethod.getAllForUser = (result: any) => {
  query(`SELECT * FROM ${table} WHERE status = 'true'`)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
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

PaymentMethod.checkStatus = (id: any, result: any) => {
  queryObject(`SELECT status FROM ${table} WHERE paymentMethodId=?`, [id])
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

export default PaymentMethod;
