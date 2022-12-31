import { query } from "../db";

const table = "product";

const Product = function (product: any) {
  this.productId = product.productId;
  this.productName = product.productName;
  this.detailPTName = product.detailPTName;
  this.description = product.description;
};

Product.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

export default Product;
