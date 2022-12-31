import {query} from "../db";

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

export default DetailProduct;
