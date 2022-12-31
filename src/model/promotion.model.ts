import {query} from "../db";

const table = "promotion";

const Promotion = function (promotion: any) {
  this.promotionCode = promotion.promotionCode;
  this.description = promotion.description;
  this.startDate = promotion.startDate;
  this.endDate = promotion.endDate;
};

Promotion.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`).then((res) => {
    result(null, res);
  });
};

export default Promotion;
