import { Request, Response } from "express";
import Address from "../model/address.model";

const prefix = "A";

export const get = (req: Request, res: Response) => {
  Address.getByCId(req.params.customerId, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      res.status(200).json(data);
    }
  });
};

export const createAddress = (req:Request, res:Response) => {
    
}