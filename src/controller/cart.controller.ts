import { Request, Response } from "express";
import Cart from "../model/cart.model";

export const getByCId = (req: Request, res: Response) => {
  Cart.getById(req.params.customerId, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      res.status(200).json(data);
    }
  });
};

const getAll = (req: Request, res: Response, id: any) => {
  Cart.getById(id, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json;
    } else {
      res.status(200).json(data);
    }
  });
};

export const getDetailCartById = (req: Request, res: Response) => {
  Cart.getDetailCartById(req.params.customerId, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      res.status(200).json(data);
    }
  });
};

export const addCart = (req: Request, res: Response) => {
  const newCart = new (Cart as any)(req.body);
  Cart.findByCIdAndDPId(
    newCart.customerId,
    newCart.detailProductId,
    (err: any, data: any) => {
      if (err) {
        console.log(err);
        res.status(500).json();
      } else {
        if (data.length) {
          const q = data[0].quantity + newCart.quantity;
          const cart = new (Cart as any)(req.body);
          cart.quantity = q;
          Cart.update(cart, (err1: any, data1: any) => {
            if (err1) {
              console.log(err1);
              res.status(500).json();
            } else {
              getAll(req, res, cart.customerId);
            }
          });
        } else {
          Cart.create(newCart, (err2: any, data2: any) => {
            if (err2) {
              console.log(err2);
              res.status(500).json();
            } else {
              // res.status(200).json();
              getAll(req, res, newCart.customerId);
            }
          });
        }
      }
    }
  );
};

export const updateCart = (req: Request, res: Response) => {
  let cart = new (Cart as any)(req.body);
  Cart.update(cart, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      // getAll(req, res, cart.customerId);
      req.params.customerId = cart.customerId;
      getDetailCartById(req, res);
    }
  });
};

export const deteleCart = (req: Request, res: Response) => {
  Cart.deleteProduct(
    req.body.customerId,
    req.body.detailProductId,
    (err: any, data: any) => {
      if (err) {
        console.log(err);
        res.status(500).json();
      } else {
        req.params.customerId = req.body.customerId;
        getDetailCartById(req, res);
      }
    }
  );
};
