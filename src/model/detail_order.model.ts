import {query} from "../db";

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

export default DetailOrder;

