import { Request, Response } from "express";
import DetailOrder from "../../model/detail_order.model";

const getAllFromOrder = (req: Request, res: Response, data: any) => {
  var promises = data.map((e: any) => {
    return new Promise((res, rej) => {
      DetailOrder.getAllFromOrder(e.orderId, (err: any, dt: any) => {
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
      // console.log(res);
      res.status(200).json(dt);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
};

export { getAllFromOrder };
