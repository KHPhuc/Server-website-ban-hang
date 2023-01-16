import { query, queryObject } from "../../db";

const table = "order";

const Order = function (order: any) {
  this.orderId = order.orderId;
  this.customerId = order.customerId;
  this.addressId = order.addressId;
  this.totalMoney = order.totalMoney;
  this.orderDate = order.orderDate;
  this.orderStatus = order.orderStatus;
  this.promotionId = order.promotionId;
  this.paymentMethodId = order.paymentMethodId;
  this.paymentStatus = order.paymentStatus;
  this.note = order.note;
};

Order.getAll = (result: any) => {
  query("SELECT * FROM `order`")
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

Order.create = (newOrder: any, result: any) => {
  queryObject("INSERT INTO `order` SET ?", newOrder)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

Order.update = (order: any, result: any) => {
  queryObject(
    "UPDATE `order` SET paymentStatus = ?, orderStatus = ? WHERE orderId = ?",
    [order.paymentStatus, order.orderStatus, order.orderId]
  )
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

export default Order;
