import {query} from "../db";

const table = "order";

const Order = function (order: any) {
  this.orderId = order.orderId;
    this.customerId = order.customerId;
    this.addressId = order.addressId;
    this.totalMoney = order.totalMoney;
    this.orderDate = order.orderDate;
    this.orderStatus = order.orderStatus;
    this.promotionCode = order.promotionCode;
    this.paymentMethodId = order.paymentMethodId;
    this.paymentStatus = order.paymentStatus;
    this.shippingUnitId = order.shippingUnitId;
};

Order.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`).then((res) => {
    result(null, res);
  });
};

export default Order;

