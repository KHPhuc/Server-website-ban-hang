import { query, queryObject } from "../db";

const table = "detail_product_type";

const DetailProductType = function (detailProductType: any) {
  this.detailPTId = detailProductType.detailPTId;
  this.detailPTName = detailProductType.detailPTName;
  this.productTypeId = detailProductType.productTypeId;
};

DetailProductType.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`).then((res) => {
    result(null, res);
  });
};

DetailProductType.getByDetailPTId = (id: any, result: any) => {
  queryObject(`SELECT * FROM ${table} WHERE detailPTId=?`, [id]).then((res) => {
    result(null, res);
  });
};

DetailProductType.getByProductTypeId = (id: any, result: any) => {
  queryObject(`SELECT * FROM ${table} WHERE productTypeId=?`, [id]).then(
    (res) => {
      result(null, res);
    }
  );
};

DetailProductType.create = (newDetailProductType: any, result: any) => {
  queryObject(`INSERT INTO ${table} SET?`, newDetailProductType)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

DetailProductType.update = (id: any, detailProductType: any, result: any) => {
  queryObject(`UPDATE ${table} SET detailPTName=? WHERE detailPTId=? `, [
    detailProductType.detailPTName,
    id,
  ])
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

DetailProductType.remove = (id: any, result: any) => {
  queryObject(`DELETE FROM ${table} WHERE detailPTId=?`, [id])
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

export default DetailProductType;
