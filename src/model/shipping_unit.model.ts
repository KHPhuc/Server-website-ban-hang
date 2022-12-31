import {query} from "../db";

const table = "shipping_unit";

const ShippingUnit = function (shippingUnit: any) {
  this.shippingUnitId = shippingUnit.shippingUnitId;
  this.shippingUnitName = shippingUnit.shippingUnitName;
  this.description = shippingUnit.description;
};

ShippingUnit.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`).then((res) => {
    result(null, res);
  });
};

export default ShippingUnit;
