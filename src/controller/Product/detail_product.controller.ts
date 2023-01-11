import DetailProduct from "../../model/Product/detail_product.model";
import { Request, Response } from "express";
import { generateId } from "../../utils/id";
import * as path from "path";
import * as fs from "fs";
import { getWithDetailProduct } from "./product.controller";

const prefix = "DP";

const uploadImage = (req: Request, res: Response) => {
  //   console.log(req.body, req.file);
  //   console.log(path.join(__dirname, "../public/") + req.file?.filename);
  if (req.file) {
    res.status(200).json(req.file?.filename);
  } else {
    res.status(500).json();
  }
};

const deleteImage = (req: Request, res: Response) => {
  let link = path.join(__dirname, "../../public/") + req.body.nameFile;
  fs.unlink(link, (err) => {
    if (err) throw err;
  });
};

const createFromProduct = (id: any, req: Request, res: Response) => {
  let convert = req.body
    .map((e: any) => {
      return e.subDetail.map((e1: any) => {
        return {
          detailProductId: generateId(prefix),
          productId: id,
          image: e.image,
          color: e.color,
          size: e1.size,
          quantity: e1.quantity,
          originalPrice: e1.originalPrice,
          currentPrice: e1.currentPrice,
        };
      });
    })
    .flat();

  let promises = convert.map((e: any) => {
    return new Promise((res, rej) => {
      let detailProduct = new (DetailProduct as any)(e);
      DetailProduct.create(detailProduct, (err: any, data: any) => {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      });
    });
  });

  Promise.all(promises)
    .then((dt) => {
      getWithDetailProduct(req, res);
      // res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
};

const create = (req: Request, res: Response) => {
  let detailProduct = new (DetailProduct as any)(req.body);
  detailProduct.detailProductId = generateId(prefix);
  DetailProduct.create(detailProduct, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      getWithDetailProduct(req, res);
    }
  });
};

const getAllWithProduct = (req: Request, res: Response, data: any) => {
  var promises = data.map((e: any) => {
    return new Promise((res, rej) => {
      DetailProduct.getAllWithProductId(e.productId, (err: any, dt: any) => {
        if (err) {
          rej(err);
        } else {
          res(dt);
        }
      });
    }).then((res: any) => {
      // console.log(res);
      // e.detailProduct = res;

      let cache = res;
      var iStart = 0;
      var count = 1;
      cache.forEach((x: any, i: any) => {
        if (i === 0) {
        } else {
          if (x.color === cache[i - 1].color) {
            count += 1;
          } else {
            cache[iStart].span = count;
            count = 1;
            iStart = i;
          }
        }
      });
      cache[iStart].span = count;
      e.detailProduct = cache;

      // e.detailProduct = [];
      // res.forEach((x: any) => {
      //   const index = e.detailProduct.findIndex(
      //     (y: any) => y.color === x.color
      //   );
      //   // console.log(e);
      //   if (!index || index === -1) {
      //     e.detailProduct.push({
      //       color: x.color,
      //       image: x.image,
      //       detailProductId: x.detailProductId,
      //       subDetail: [
      //         {
      //           size: x.size,
      //           quantity: x.quantity,
      //           originalPrice: x.originalPrice,
      //           currentPrice: x.currentPrice,
      //         },
      //       ],
      //     });
      //   } else {
      //     e.detailProduct[index].subDetail.push({
      //       size: x.size,
      //       quantity: x.quantity,
      //       originalPrice: x.originalPrice,
      //       currentPrice: x.currentPrice,
      //     });
      //   }
      // });

      return e;
    });
  });

  Promise.all(promises)
    .then((dt) => {
      // console.log(dt);
      res.status(200).json(dt);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
};

const update = (req: Request, res: Response) => {
  const detailProduct = new (DetailProduct as any)(req.body);
  // detailProduct.detailProductId = generateId(prefix);

  DetailProduct.update(
    req.params.detailProductId,
    detailProduct,
    (err: any, data: any) => {
      if (err) {
        console.log(err);
        res.status(500).json();
      } else {
        getWithDetailProduct(req, res);
      }
    }
  );
};

const updateAndDelete = (req: Request, res: Response) => {
  const detailProduct = new (DetailProduct as any)(req.body);
  detailProduct.detailProductId = generateId(prefix);

  DetailProduct.delete(req.params.detailProductId, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      // res.status(200).json(data);
      // getWithDetailProduct(req, res);
      DetailProduct.create(detailProduct, (err: any, data: any) => {
        if (err) {
          console.log(err);
        } else {
          getWithDetailProduct(req, res);
        }
      });
    }
  });
};

const deleteFromProduct = (req: Request, res: Response) => {
  DetailProduct.deleteFromProduct(
    req.params.productId,
    (err: any, data: any) => {
      if (err) {
        console.log(err);
      } else {
        // res.status(200).json(data);
        getWithDetailProduct(req, res);
      }
    }
  );
};

const remove = (req: Request, res: Response) => {
  DetailProduct.delete(req.params.detailProductId, (err: any, data: any) => {
    if (err) {
      console.log(err);
    } else {
      // res.status(200).json(data);
      getWithDetailProduct(req, res);
    }
  });
};

export {
  createFromProduct,
  uploadImage,
  deleteImage,
  getAllWithProduct,
  deleteFromProduct,
  remove,
  updateAndDelete,
  update,
  create,
};
