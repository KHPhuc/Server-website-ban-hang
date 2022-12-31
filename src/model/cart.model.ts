import {query} from "../db";

const table = "cart";

const Cart = function (cart: any) {
  this.customerId = cart.customerId;
  this.detailProductId = cart.detailProductId;
  this.quantity = cart.quantity;
};

Cart.getAll = (result: any) => {
  query(`SELECT * FROM ${table}`).then((res) => {
    result(null, res);
  });
};

export default Cart;
