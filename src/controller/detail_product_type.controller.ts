import { Request, Response } from "express";
import DetailProductType from "../model/detail_product_type.model";
import { generateId } from "../utils/id";

const prefix = "DPT";

const getByProductTypeId = (req: Request, res: Response) => {
  DetailProductType.getByProductTypeId(
    req.params.productTypeId,
    (err: any, data: any) => {
      if (err) {
        console.log(err);
        res.status(500).json();
      } else {
        res.status(200).json(data);
      }
    }
  );
};

const create = (req: Request, res: Response) => {
  const detailProductType = new (DetailProductType as any)(req.body);
  detailProductType.detailPTId = generateId(prefix);
  DetailProductType.create(detailProductType, (err: any, data: any) => {
    if (err) {
      //   res.status(500).json();
      console.log(err);
    } else {
      //   res.status(200).json(data);
      req.params.productTypeId = detailProductType.productTypeId;
      getByProductTypeId(req, res);
    }
  });
};

const update = (req: Request, res: Response) => {
  const detailProductType = new (DetailProductType as any)(req.body);
  DetailProductType.update(
    req.params.detailPTId,
    detailProductType,
    (err: any, data: any) => {
      if (err) {
        console.log(err);
      } else {
        // res.status(200).json(data);
        DetailProductType.getByDetailPTId(
          req.params.detailPTId,
          (err: any, data: any) => {
            if (err) {
            } else {
              req.params.productTypeId = data[0].productTypeId;
              getByProductTypeId(req, res);
            }
          }
        );
      }
    }
  );
};

const remove = (req: Request, res: Response) => {
  DetailProductType.getByDetailPTId(
    req.params.detailPTId,
    (err: any, data: any) => {
      if (err) {
      } else {
        req.params.productTypeId = data[0].productTypeId;
      }
    }
  );
  DetailProductType.remove(req.params.detailPTId, (err: any, data: any) => {
    if (err) {
      console.log(err);
    } else {
      getByProductTypeId(req, res);
    }
  });
};

export { getByProductTypeId, create, update, remove };
