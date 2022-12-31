import { query, queryObject } from "../db";

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
  queryObject(`INSERT INTO ${table} SET ?`, newProductType)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

ProductType.update = (id: any, productType: any, result: any) => {
  queryObject(
    `UPDATE ${table} SET productTypeName = ? WHERE productTypeId = ?`,
    [productType.productTypeName, id]
  )
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

ProductType.delete = (id: any, result: any) => {
  queryObject(`DELETE FROM ${table} WHERE productTypeId = ?`, id)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

export default ProductType;
