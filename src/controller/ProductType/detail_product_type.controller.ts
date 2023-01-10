import { Request, Response } from "express";
import DetailProductType from "../../model/ProductType/detail_product_type.model";
import { generateId } from "../../utils/id";
var XLSX = require("xlsx");

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

const getAllFollowPT = async (req: Request, res: Response, data: any) => {
  var promises = data.map((e: any) => {
    return new Promise((res, rej) => {
      DetailProductType.getByProductTypeId(
        e.productTypeId,
        (err: any, dt: any) => {
          if (err) {
            rej(err);
          } else {
            res(dt);
          }
        }
      );
    }).then((res) => {
      e.detailProductType = res;
      return e;
    });
  });

  Promise.all(promises)
    .then((dt) => {
      // console.log(res);
      res.status(200).json(dt);
    })
    .catch((err) => {
      res.status(500).json();
    });
};

const exportExcel = async (req: Request, res: Response, data: any) => {
  var promises = data.map((e: any) => {
    return new Promise((res, rej) => {
      DetailProductType.getByProductTypeId(
        e.productTypeId,
        (err: any, dt: any) => {
          if (err) {
            rej(err);
          } else {
            res(dt);
          }
        }
      );
    }).then((res) => {
      e.detailProductType = res;
      return e;
    });
  });

  Promise.all(promises)
    .then((dt) => {
      // console.log(res);
      let cache = dt
        .map((e: any, i: any) => {
          return e.detailProductType.map((e1: any, i1: any) => {
            return i1 === 0
              ? {
                  "Loại chính": e.productTypeName,
                  "Loại con": e1.detailPTName,
                  "Mã loại con": e1.detailPTId,
                }
              : {
                  "Loại chính": "",
                  "Loại con": e1.detailPTName,
                  "Mã loại con": e1.detailPTId,
                };
          });
        })
        .flat();

      const workSheet = XLSX.utils.json_to_sheet(cache);
      const workBook = XLSX.utils.book_new();
      workSheet["A1"].s = {
        font: {
          bold: true,
        },
      };

      XLSX.utils.book_append_sheet(workBook, workSheet, "Product Type");
      const buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="Product Type.xlsx"'
      );
      res.setHeader("Content-Type", "application/vnd.ms-excel");
      res.end(buf);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
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

export {
  getByProductTypeId,
  create,
  update,
  remove,
  getAllFollowPT,
  exportExcel,
};
