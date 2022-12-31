import {query} from "../db";

const table = "payment_method";

const PaymentMethod = function (paymentMethod: any) {
  this.paymentMethodId = paymentMethod.paymentMethodId;
  this.paymentMethodName = paymentMethod.paymentMethodName;
  this.description = paymentMethod.description;
  this.show = paymentMethod.show;
};

PaymentMethod.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`).then((res) => {
    result(null, res);
  });
};

export default PaymentMethod;
