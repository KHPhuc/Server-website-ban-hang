import { Request, Response } from "express";
import Order from "../../model/Order/order.model";
import { getAllFromOrder, getDetailForCustomer } from "./detail_order";
import { makeMomo, makeRefundMomo } from "../../payment/Momo/MoMo";
import Address from "../../model/address.model";
import { generateId } from "../../utils/id";
import DetailOrder from "../../model/Order/detail_order.model";
import Cart from "../../model/cart.model";

const prefix = "O";

export const receiveResult = (req: Request, res: Response) => {
  // console.log(req.params);
  console.log(req.body);
  if (req.body.resultCode === 0) {
    let order = {
      orderId: req.body.orderId,
      orderStatus: "Chuẩn bị hàng",
      paymentStatus: "Đã thanh toán",
      paymentCode: req.body.transId,
    };
    Order.update(order, (err: any, data: any) => {});
  } else if (req.body.resultCode === 1006) {
    let order = {
      orderId: req.body.orderId,
      orderStatus: "Đã hủy",
      paymentStatus: "Đã hủy",
    };
    Order.update(order, (err: any, data: any) => {});
  }
};

const getAll = (req: Request, res: Response) => {
  Order.getAll(req.body.page, req.body.orderStatus, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      getDetailForCustomer(req, res, data);
    }
  });
};

export const updateOrderStatus = (req: Request, res: Response) => {
  var order = {
    orderId: req.body.orderId,
    orderStatus: req.body.orderStatus,
    paymentMethodId: req.body.paymentMethodId,
    paymentStatus: req.body.paymentStatus,
    paymentCode: req.body.paymentCode,
  };

  if (req.body.orderStatus === "Đã hủy") {
    if (req.body.paymentStatus === "Đã thanh toán") {
      if (req.body.paymentMethodId === "PM-02") {
        makeRefundMomo(
          req.body.totalMoney,
          req.body.orderId,
          req.body.paymentCode
        )
          .then((rs: any) => {
            if (rs.resultCode === 0) {
              order.paymentStatus = "Đã hoàn tiền";
              Order.update(order, (err: any, data: any) => {
                if (err) {
                  console.log(err);
                  res.status(500).json();
                } else {
                  req.body.orderStatus = req.body.orderStatus1;
                  getAll(req, res);
                }
              });
            }
          })
          .catch((err) => {
            console.log(err);
            order.paymentStatus = "Đợi hoàn tiền";
            Order.update(order, (err: any, data: any) => {
              if (err) {
                console.log(err);
                res.status(500).json();
              } else {
                req.body.orderStatus = req.body.orderStatus1;
                getAll(req, res);
              }
            });
          });
      }
    } else {
      Order.update(order, (err: any, data: any) => {
        if (err) {
          console.log(err);
          res.status(500).json();
        } else {
          req.body.orderStatus = req.body.orderStatus1;
          getAll(req, res);
        }
      });
    }
  } else {
    Order.update(order, (err: any, data: any) => {
      if (err) {
        console.log(err);
        res.status(500).json();
      } else {
        req.body.orderStatus = req.body.orderStatus1;
        getAll(req, res);
      }
    });
  }
};

export const cancelOrder = (req: Request, res: Response) => {
  var order = {
    orderId: req.body.orderId,
    orderStatus: "Đã hủy",
    paymentMethodId: req.body.paymentMethodId,
    paymentStatus: req.body.paymentStatus,
    paymentCode: req.body.paymentCode,
  };
  if (req.body.paymentStatus === "Đã thanh toán") {
    if (req.body.paymentMethodId === "PM-02") {
      makeRefundMomo(
        req.body.totalMoney,
        req.body.orderId + "-1",
        req.body.paymentCode
      )
        .then((rs: any) => {
          if (rs.resultCode === 0) {
            order.paymentStatus = "Đã hoàn tiền";
            Order.update(order, (err: any, data: any) => {
              if (err) {
                console.log(err);
                res.status(500).json();
              } else {
                res.status(200).json({
                  paymentStatus: "Đã hoàn tiền",
                });
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
          order.paymentStatus = "Đợi hoàn tiền";
          Order.update(order, (err: any, data: any) => {
            if (err) {
              console.log(err);
              res.status(500).json();
            } else {
              res.status(200).json({
                paymentStatus: "Đợi hoàn tiền",
              });
            }
          });
        });
    }
  } else {
    Order.update(order, (err: any, data: any) => {
      if (err) {
        console.log(err);
        res.status(500).json();
      } else {
        res.status(200).json();
      }
    });
  }
};

export const preCreateOrder = (req: Request, res: Response) => {
  var newOrder = new (Order as any)(req.body);
  newOrder.orderId = generateId(prefix);
  if (req.body.addressId) {
    createOrder(req, res, newOrder);
  } else {
    let newAddress = new (Address as any)(req.body);
    Address.findByAll(newAddress, (err: any, data: any) => {
      if (err) {
        console.log(err);
        res.status(500).json();
      } else {
        if (data.length) {
          newOrder.addressId = data[0].addressId;
          createOrder(req, res, newOrder);
        } else {
          newAddress.addressId = generateId("A");
          Address.create(newAddress, (err: any, data: any) => {
            if (err) {
              console.log(err);
              res.status(500).json();
            } else {
              newOrder.addressId = newAddress.addressId;
              createOrder(req, res, newOrder);
            }
          });
        }
      }
    });
  }
};

export const createOrder = (req: Request, res: Response, newOrder: any) => {
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
