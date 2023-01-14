import { Request, Response } from "express";
import Order from "../../model/order.model";
import { getAllFromOrder } from "./detail_order";

const prefix = "O";

export const receiveResult = (req: Request, res: Response) => {
  console.log(req.params);
  console.log(req.body);
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

export { getAll };
