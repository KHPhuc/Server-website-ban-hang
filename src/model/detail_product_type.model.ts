import { query, queryOnject } from "../db";

const table = "detail_product_type";

const DetailProductType = function (detailProductType: any) {
  this.detailPTName = detailProductType.detailPTName;
  this.productTypeName = detailProductType.productTypeName;
};

DetailProductType.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`).then((res) => {
    result(null, res);
  });
};

DetailProductType.create = (newDetailProductType: any, result: any) => {
  queryOnject(`INSERT INTO ${table} SET?`, newDetailProductType)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

// DetailProductType.update = (newDetailProductType: any, result: any) => {
//   let id = newDetailProductType.det
// }

DetailProductType.delete = (id: any, result: any) => {
  query(`DELETE FROM ${table} WHERE ID = ${id}`)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

export default DetailProductType;
