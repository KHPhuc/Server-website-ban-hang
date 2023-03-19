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
  this.paymentCode = order.paymentCode;
  this.note = order.note;
};

Order.getAll = (page: any, orderStatus: any, result: any) => {
  let step = 10;
  if (!orderStatus) {
    var q =
      "SELECT orderId, customerId, totalMoney, orderDate, orderStatus, `order`.`addressId`, address, ward, district, city, name, phoneNumber, `order`.`promotionId`, sale, `order`.paymentMethodId, payment_method.description, paymentStatus, paymentCode FROM `order` INNER JOIN address INNER JOIN payment_method LEFT JOIN promotion ON `order`.promotionId = promotion.promotionId WHERE `order`.`addressId` = address.addressId AND `order`.paymentMethodId = payment_method.paymentMethodId ORDER BY orderDate DESC LIMIT ?, ?";
  } else {
    var q =
      "SELECT orderId, customerId, totalMoney, orderDate, orderStatus, `order`.`addressId`, address, ward, district, city, name, phoneNumber, `order`.`promotionId`, sale, `order`.paymentMethodId, payment_method.description, paymentStatus, paymentCode FROM `order` INNER JOIN address INNER JOIN payment_method LEFT JOIN promotion ON `order`.promotionId = promotion.promotionId WHERE `order`.`addressId` = address.addressId AND `order`.paymentMethodId = payment_method.paymentMethodId AND orderStatus = '" +
      orderStatus +
      "' ORDER BY orderDate DESC LIMIT ?, ?";
  }
  queryObject(q, [page * step, step])
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
    "UPDATE `order` SET paymentStatus = ?, orderStatus = ?, paymentCode = ? WHERE orderId = ?",
    [order.paymentStatus, order.orderStatus, order.paymentCode, order.orderId]
  )
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

Order.getAllForCustomer = (
  customerId: any,
  page: any,
  orderStatus: any,
  result: any
) => {
  let step = 5;
  if (!orderStatus) {
    var q =
      "SELECT orderId, customerId, totalMoney, orderDate, orderStatus, `order`.`addressId`, address, ward, district, city, name, phoneNumber, `order`.`promotionId`, sale, `order`.paymentMethodId, payment_method.description, paymentStatus, paymentCode FROM `order` INNER JOIN address INNER JOIN payment_method LEFT JOIN promotion ON `order`.promotionId = promotion.promotionId WHERE `order`.`addressId` = address.addressId AND `order`.paymentMethodId = payment_method.paymentMethodId AND customerId = ? ORDER BY orderDate DESC LIMIT ?, ?";
  } else {
    var q =
      "SELECT orderId, customerId, totalMoney, orderDate, orderStatus, `order`.`addressId`, address, ward, district, city, name, phoneNumber, `order`.`promotionId`, sale, `order`.paymentMethodId, payment_method.description, paymentStatus, paymentCode FROM `order` INNER JOIN address INNER JOIN payment_method LEFT JOIN promotion ON `order`.promotionId = promotion.promotionId WHERE `order`.`addressId` = address.addressId AND `order`.paymentMethodId = payment_method.paymentMethodId AND customerId = ? AND orderStatus = '" +
      orderStatus +
      "' ORDER BY orderDate DESC LIMIT ?, ?";
  }
  queryObject(q, [customerId, page * step, step])
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

export default Order;
