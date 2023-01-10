import { Request, Response } from "express";
import ProductType from "../../model/ProductType/product_type.model";
import { exportExcel, getAllFollowPT } from "./detail_product_type.controller";
import { generateId } from "../../utils/id";

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

const getWithDetailProductType = (req: Request, res: Response) => {
  ProductType.getAll((err: any, data: any) => {
    if (err) {
      res.status(500).json({});
      // res.status(500).json({ message: "Thêm thất bại" });
    } else {
      // res.status(200).json(data);
      getAllFollowPT(req, res, data);
    }
  });
};

const getExcelSample = (req: Request, res: Response) => {
  ProductType.getAll((err: any, data: any) => {
    if (err) {
      res.status(500).json({});
      // res.status(500).json({ message: "Thêm thất bại" });
    } else {
      // res.status(200).json(data);
      exportExcel(req, res, data);
    }
  });
}

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
      // res.status(200).json(data);
      getAll(req, res);
    }
  });
};

const update = (req: Request, res: Response) => {
  const productType = new (ProductType as any)(req.body);
  ProductType.update(
    req.params.productTypeId,
    productType,
    (err: any, data: any) => {
      if (err) {
        console.log(err);
      } else {
        // res.status(200).json(data);
        getAll(req, res);
      }
    }
  );
};

const remove = (req: Request, res: Response) => {
  ProductType.delete(req.params.productTypeId, (err: any, data: any) => {
    if (err) {
      console.log(err);
    } else {
      // res.status(200).json(data);
      getAll(req, res);
    }
  });
};

export { getAll, create, update, remove, getWithDetailProductType, getExcelSample };
