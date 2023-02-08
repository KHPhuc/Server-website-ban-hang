import { Request, Response } from "express";
import Order from "../../model/Order/order.model";
import { getAllFromOrder, getDetailForCustomer } from "./detail_order";
import { makeMomo } from "../../payment/Momo/MoMo";
import Address from "../../model/address.model";
import { generateId } from "../../utils/id";
import DetailOrder from "../../model/Order/detail_order.model";
import Cart from "../../model/cart.model";

const prefix = "O";

export const receiveResult = (req: Request, res: Response) => {
  // console.log(req.params);
  // console.log(req.body);
  if (req.body.resultCode === 0) {
    let order = {
      orderId: req.body.orderId,
      orderStatus: "Chuẩn bị hàng",
      paymentStatus: "Đã thanh toán",
    };
    Order.update(order, (err: any, data: any) => {});
  } else if (req.body.resultCode === 1006) {
    let order = {
      orderId: req.body.orderId,
      orderStatus: "Đã hủy",
      paymentStatus: "Chưa thanh toán",
    };
    Order.update(order, (err: any, data: any) => {});
  }
};

const getAll = (req: Request, res: Response) => {
  Order.getAll((err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      getAllFromOrder(req, res, data);
    }
  });
};

export const createOrder = (req: Request, res: Response) => {
  let newAddress = new (Address as any)(req.body);
  newAddress.addressId = generateId("A");
  Address.create(newAddress, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      let newOrder = new (Order as any)(req.body);
      newOrder.orderId = generateId(prefix);
      newOrder.addressId = newAddress.addressId;
      Order.create(newOrder, (err: any, data: any) => {
        if (err) {
          console.log(err);
          res.status(500).json();
        } else {
          var promises = req.body.listProduct.map((e: any) => {
            let newDetailOrder = new (DetailOrder as any)(e);
            newDetailOrder.orderId = newOrder.orderId;
            return new Promise((res, rej) => {
              DetailOrder.create(newDetailOrder, (err: any, dt: any) => {
                if (err) {
                  rej(err);
                } else {
                  res(dt);
                }
              });
            }).then((res) => {
              e.detailOrder = res;
              return e;
            });
          });

          Promise.all(promises)
            .then((dt) => {
              Cart.delete(newOrder.customerId, (err1: any, data1: any) => {
                if (err1) {
                  console.log(err1);
                } else {
                }
              });
              if (newOrder.paymentMethodId === "PM-02") {
                makeMomo(newOrder.totalMoney, newOrder.orderId)
                  .then((data: any) => {
                    res.status(200).json(data);
                  })
                  .catch((err: any) => {
                    console.log(err);
                    res.status(500).json();
                  });
              } else {
                res.status(200).json(true);
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json();
            });
        }
      });
    }
  });
};

export const getAllForCustomers = (req: Request, res: Response) => {
  Order.getAllForCustomer(
    req.body.customerId,
    req.body.page,
    req.body.orderStatus,
    (err: any, data: any) => {
      if (err) {
        console.log(err);
        res.status(500).json();
      } else {
        getDetailForCustomer(req, res, data);
      }
    }
  );
};

export { getAll };
