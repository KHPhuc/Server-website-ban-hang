import { Request, response, Response } from "express";
import Promotion from "../model/promotion.model";
import { generateId } from "../utils/id";

const prefix = "PR";

const getAll = (req: Request, res: Response) => {
  Promotion.getAll((err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      res.status(200).json(data);
    }
  });
};

const create = (req: Request, res: Response) => {
  let newPromotion = new (Promotion as any)(req.body);
  newPromotion.promotionId = generateId(prefix);
  Promotion.getByCode(newPromotion.promotionCode, (err: any, data: any) => {
    if (err) {
      console.log(err);
    } else {
      if (data.length) {
        res.status(500).json({ message: "Trùng mã giảm giá" });
      } else {
        Promotion.create(newPromotion, (err: any, data: any) => {
          if (err) {
            console.log(err);
            res.status(500).json();
          } else {
            getAll(req, res);
          }
        });
      }
    }
  });
};

const update = (req: Request, res: Response) => {
  let promotion = new (Promotion as any)(req.body);
  Promotion.update(req.params.promotionId, promotion, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      getAll(req, res);
    }
  });
};

const updateAndDelete = (req: Request, res: Response) => {
  let newPromotion = new (Promotion as any)(req.body);
  newPromotion.promotionId = generateId(prefix);

  Promotion.delete(req.params.promotionId, (err: any, data: any) => {
    if (err) {
      console.log(err);
    } else {
      Promotion.create(newPromotion, (err: any, data: any) => {
        if (err) {
          res.status(500).json();
        } else {
          getAll(req, res);
        }
      });
    }
  });
};

const remove = (req: Request, res: Response) => {
  Promotion.delete(req.params.promotionId, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      getAll(req, res);
    }
  });
};

export { getAll, create, update, updateAndDelete, remove };
