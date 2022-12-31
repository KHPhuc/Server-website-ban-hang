import { Request, Response } from "express";
import ProductType from "../model/product_type.model";
import { generateId } from "../utils/id";

const prefix = "PT";

const getAll = (req: Request, res: Response) => {
  ProductType.getAll((err: any, data: any) => {
    if (err) {
      res.status(500).json({});
      // res.status(500).json({ message: "Thêm thất bại" });
    } else {
      res.status(200).json(data);
    }
  });
};

const create = (req: Request, res: Response) => {
  const productType = new (ProductType as any)(req.body);
  productType.productTypeId = generateId(prefix);
  ProductType.create(productType, (err: any, data: any) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        if (err.sqlMessage.includes("productTypeNam")) {
          res.status(500).json({ message: "Đã có danh mục!" });
        }
      }
    } else {
      res.status(200).json({ rs: data });
    }
  });
};

const findById = (req: any, res: Response) => {};

const update = (req: Request, res: Response) => {};

export { getAll, create };
