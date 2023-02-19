import { query, queryObject } from "../../db";

const table = "detail_order";

const DetailOrder = function (detailOrder: any) {
  this.orderId = detailOrder.orderId;
  this.detailProductId = detailOrder.detailProductId;
  this.quantity = detailOrder.quantity;
};

DetailOrder.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`).then((res) => {
    result(null, res);
  });
};

DetailOrder.getAllFromOrder = (orderId: any, result: any) => {
  query(
    `SELECT * FROM ${table} INNER JOIN detail_product WHERE ${table}.detailProductId = detail_product.detailProductId AND orderId = "${orderId}"`
  )
    .then((res) => {
      result(null, res);
    })
    .catch((err: any) => {
      result(err, null);
    });
};

DetailOrder.create = (newDetailOrder: any, result: any) => {
  queryObject(`INSERT INTO ${table} SET?`, newDetailOrder)
    .then((res) => {
      result(null, res);
    })
    .catch((err: any) => {
      result(err, null);
    });
};

DetailOrder.getDetail = (orderId: any, result: any) => {
  queryObject(
    `SELECT orderID, detail_product.productId, detail_order.detailProductId, productName, image, color, size, originalPrice, currentPrice, detail_order.quantity FROM detail_order INNER JOIN detail_product, product WHERE detail_order.detailProductId = detail_product.detailProductId AND detail_product.productId = product.productId AND orderId = ?`,
    [orderId]
  )
    .then((res) => {
      result(null, res);
    })
    .catch((err: any) => {
      result(err, null);
    });
};

export default DetailOrder;
