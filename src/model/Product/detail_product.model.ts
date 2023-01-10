import { query, queryObject } from "../../db";

const table = "detail_product";

const DetailProduct = function (detailProduct: any) {
  this.detailProductId = detailProduct.detailProductId;
  this.productId = detailProduct.productId;
  this.image = detailProduct.image;
  this.color = detailProduct.color;
  this.size = detailProduct.size;
  this.quantity = detailProduct.quantity;
  this.originalPrice = detailProduct.originalPrice;
  this.currentPrice = detailProduct.currentPrice;
};

DetailProduct.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`).then((res) => {
    result(null, res);
  });
};

DetailProduct.getAllWithProductId = (id: any, result: any) => {
  queryObject(`SELECT * FROM ${table} WHERE productId=? AND old = ?`, [
    id,
    "false",
  ])
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

DetailProduct.create = (newDetailProduct: any, result: any) => {
  queryObject(`INSERT INTO ${table} SET?`, newDetailProduct)
    .then((res) => result(null, res))
    .catch((err) => result(err, null));
};

DetailProduct.deleteFromProduct = (id: any, result: any) => {
  queryObject(`UPDATE ${table} SET old=? WHERE productId = ?`, ["true", id])
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      // result(err, null);
    });
};

DetailProduct.delete = (id: any, result: any) => {
  queryObject(`UPDATE ${table} SET old=? WHERE detailProductId = ?`, [
    "true",
    id,
  ])
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      // result(err, null);
    });
};

export default DetailProduct;