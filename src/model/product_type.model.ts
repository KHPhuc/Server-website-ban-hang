import { query, queryOnject } from "../db";

const table = "product_type";

const ProductType = function (productType: any) {
  this.productTypeId = productType.productTypeId;
  this.productTypeName = productType.productTypeName;
};

ProductType.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

ProductType.create = (newProductType: any, result: any) => {
  queryOnject(`INSERT INTO ${table} SET ?`, newProductType)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

export default ProductType;
