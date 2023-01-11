import { Request, Response } from "express";
import PaymentMethod from "../model/payment_method.model";

const prefix = "PM";

const getAll = (req: Request, res: Response) => {
  PaymentMethod.getAll((err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      res.status(200).json(data);
    }
  });
};

const update = (req: Request, res: Response) => {
  let paymentMethod = new (PaymentMethod as any)(req.body);
  PaymentMethod.update(
    req.params.paymentId,
    paymentMethod,
    (err: any, data: any) => {
      if (err) {
        console.log(err);
        res.status(500).json();
      } else {
        getAll(req, res);
      }
    }
  );
};

export { getAll, update };
