import { query, queryObject } from "../db";

const table = "cart";

const Cart = function (cart: any) {
  this.customerId = cart.customerId;
  this.detailProductId = cart.detailProductId;
  this.quantity = cart.quantity;
};

Cart.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`).then((res) => {
    result(null, res);
  });
};

Cart.getDetailCartById = (id: any, result: any) => {
  queryObject(
    `SELECT product.productId, productName, cart.detailProductId, image, color, size, cart.quantity, currentPrice, originalPrice, detail_product.quantity as kho, linkProduct FROM ${table} INNER JOIN detail_product, product WHERE cart.detailProductId = detail_product.detailProductId AND detail_product.productId = product.productId AND customerId = ?`,
    id
  )
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

Cart.getById = (id: any, result: any) => {
  queryObject(`SELECT * FROM ${table} WHERE customerId = ?`, id)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(null, err);
    });
};

Cart.findByCIdAndDPId = (Cid: any, DPid: any, result: any) => {
  queryObject(
    `SELECT * FROM ${table} WHERE customerId = ? AND detailProductId = ?`,
    [Cid, DPid]
  )
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(null, err);
    });
};

Cart.create = (newCart: any, result: any) => {
  queryObject(`INSERT INTO ${table} SET?`, newCart)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

Cart.update = (cart: any, result: any) => {
  queryObject(
    `UPDATE ${table} SET quantity = ? WHERE customerId = ? AND detailProductId = ?`,
    [cart.quantity, cart.customerId, cart.detailProductId]
  )
    .then((res) => result(null, res))
    .catch((err) => result(err, null));
};

Cart.deleteProduct = (cId: any, dpId: any, result: any) => {
  queryObject(
    `DELETE FROM ${table} WHERE customerId = ? AND detailProductId = ? `,
    [cId, dpId]
  )
    .then((res) => result(null, res))
    .catch((err) => result(err, null));
};

Cart.delete = (cId: any, result: any) => {
  queryObject(`DELETE FROM ${table} WHERE customerId = ?`, cId)
    .then((res) => result(null, res))
    .catch((err) => result(err, null));
};

export default Cart;
