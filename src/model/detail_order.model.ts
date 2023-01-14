import { query } from "../db";

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

export default DetailOrder;
