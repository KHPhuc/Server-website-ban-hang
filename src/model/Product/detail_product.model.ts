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

DetailProduct.getAllToShow = (page: any, result: any) => {
  query(
    `SELECT * FROM ${table} INNER JOIN product WHERE detail_product.productId = product.productId AND detail_product.old = "false" AND quantity > 0 GROUP BY color, detail_product.productId LIMIT ${
      page * 20
    }, 20`
  )
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

DetailProduct.searchProduct = (page: any, text: any, result: any) => {
  var q = `SELECT * FROM ${table} INNER JOIN product WHERE detail_product.productId = product.productId AND detail_product.old = "false" AND quantity > 0`;
  q += ` AND MATCH(productName) AGAINST ("${text}") GROUP BY color, detail_product.productId LIMIT ${
    page * 20
  }, 20`;

  query(q)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

DetailProduct.getFollowDetailPT = (
  id: any,
  page: any,
  color: any,
  size: any,
  result: any
) => {
  let q = `SELECT * FROM product INNER JOIN ${table} WHERE detail_product.productId = product.productId AND detailPTId = "${id}" AND detailProductId IN (SELECT detailProductId FROM ${table} WHERE old = "false" AND quantity > 0`;
  if (color) {
    q += ` AND color = '${color}'`;
  }
  if (size) {
    q += ` AND size = '${size}'`;
  }
  q += ` GROUP BY color, productId) GROUP BY color, detail_product.productId LIMIT ${
    page * 20
  }, 20`;
  query(q)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

DetailProduct.getProperties = (id: any, result: any) => {
  query(
    `SELECT color, size FROM product INNER JOIN detail_product WHERE product.productId = detail_product.productId AND  product.old = 'false' AND detail_product.old = 'false' AND quantity > 0 AND detailPTId = '${id}' GROUP BY color, size`
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
  queryObject(
    `UPDATE ${table} SET image=?, quantity=? WHERE detailProductId=? `,
    [detailProduct.image, detailProduct.quantity, id]
  )
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

DetailProduct.checkQuantity = (id: any, result: any) => {
  queryObject(
    `SELECT quantity, productName FROM ${table} INNER JOIN product WHERE ${table}.productId = product.productId AND detailProductId = ?`,
    [id]
  )
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

export default DetailProduct;
