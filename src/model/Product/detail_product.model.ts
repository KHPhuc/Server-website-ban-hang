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

DetailProduct.getAllToShow = (result: any) => {
  query(
    `SELECT * FROM ${table} INNER JOIN product WHERE detail_product.productId = product.productId AND detail_product.old = "false" AND quantity!=0 GROUP BY color, detail_product.productId`
  )
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

DetailProduct.getFollowDetailPT = (id: any, result: any) => {
  query(
    `SELECT * FROM product INNER JOIN ${table} WHERE detail_product.productId = product.productId AND detailPTId = "${id}" AND detailProductId IN (SELECT detailProductId FROM ${table} WHERE old = "false" AND quantity != 0 GROUP BY color, productId) GROUP BY color, detail_product.productId`
  )
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

DetailProduct.update = (id: any, detailProduct: any, result: any) => {
  queryObject(`UPDATE ${table} SET image=? WHERE detailProductId=? `, [
    detailProduct.image,
    id,
  ])
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
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
