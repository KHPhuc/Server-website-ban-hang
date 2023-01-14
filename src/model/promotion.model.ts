import { query, queryObject } from "../db";

const table = "promotion";

const Promotion = function (promotion: any) {
  this.promotionId = promotion.promotionId;
  this.promotionCode = promotion.promotionCode;
  this.description = promotion.description;
  this.startDate = promotion.startDate;
  this.endDate = promotion.endDate;
  this.times = promotion.times;
  this.used = promotion.used;
  this.minimum = promotion.minimum;
  this.sale = promotion.sale;
};

Promotion.getAll = (result: any) => {
  query(`SELECT * FROM ${table} WHERE old = "false"`).then((res) => {
    result(null, res);
  });
};

Promotion.getByCode = (id: any, result: any) => {
  queryObject(`SELECT * FROM ${table} WHERE promotionCode = ? AND old = ?`, [
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

Promotion.create = (newPromotion: any, result: any) => {
  queryObject(`INSERT INTO ${table} SET?`, newPromotion)
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

Promotion.update = (id: any, promotion: any, result: any) => {
  queryObject(
    `UPDATE ${table} SET description=?, startDate=?, endDate=?, times=?, minimum=? WHERE promotionId=?`,
    [
      promotion.description,
      promotion.startDate,
      promotion.endDate,
      promotion.times,
      promotion.minimum,
      id,
    ]
  )
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

Promotion.delete = (id: any, result: any) => {
  queryObject(`UPDATE ${table} SET old=? WHERE promotionId=?`, ["true", id])
    .then((res) => {
      result(null, res);
    })
    .catch((err) => {
      result(err, null);
    });
};

export default Promotion;
