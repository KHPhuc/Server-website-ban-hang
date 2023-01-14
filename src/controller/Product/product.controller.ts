import Product from "../../model/Product/product.model";
import { Request, Response } from "express";
import { generateId } from "../../utils/id";
import {
  createFromProduct,
  deleteFromProduct,
  getAllWithProduct,
} from "./detail_product.controller";

const prefix = "P";

const getAll = (req: Request, res: Response) => {
  Product.getAll((err: any, data: any) => {
    if (err) {
      res.status(500).json({ message: "Lấy thất bại" });
    } else {
      res.status(200).json(data);
    }
  });
};

export const getDetailProductByUrl = (req: Request, res: Response) => {
  Product.getDetailProduct(req.params.linkProduct, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      if (data.length) {
        let cache: any = {
          productId: data[0].productId,
          productName: data[0].productName,
          description: data[0].description,
          totalScore: data[0].totalScore,
          totalComment: data[0].totalComment,
          detailProduct: [],
        };
        data.forEach((e: any) => {
          let index = cache.detailProduct.findIndex(
            (x: any) => x.color === e.color
          );
          if (index === -1) {
            cache.detailProduct.push({
              color: e.color,
              image: e.image,
              sizes: [
                {
                  detailProductId: e.detailProductId,
                  size: e.size,
                  originalPrice: e.originalPrice,
                  currentPrice: e.currentPrice,
                  quantity: e.quantity,
                },
              ],
            });
          } else {
            cache.detailProduct[index].sizes.push({
              detailProductId: e.detailProductId,
              size: e.size,
              originalPrice: e.originalPrice,
              currentPrice: e.currentPrice,
              quantity: e.quantity,
            });
          }
        });
        res.status(200).json(cache);
      } else {
        res.status(200).json("");
      }
    }
  });
};

const getWithDetailProduct = (req: Request, res: Response) => {
  Product.getAllWithDP((err: any, data: any) => {
    if (err) {
      res.status(500).json({ message: "Lấy thất bại" });
    } else {
      getAllWithProduct(req, res, data);
    }
  });
};

const create = (req: Request, res: Response) => {
  const product = new (Product as any)(req.body);
  product.productId = generateId(prefix);

  Product.findNameProduct(product.productName, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      if (data.length) {
        res.status(500).json({ message: "Đã có tên sản phẩm" });
      } else {
        Product.create(product, (err: any, data: any) => {
          if (err) {
            res.status(500).json();
          } else {
            req.body = req.body.detailProduct;
            createFromProduct(product.productId, req, res);
          }
        });
      }
    }
  });
};

const update = (req: Request, res: Response) => {
  const product = new (Product as any)(req.body);
  console.log(product);

  Product.update(req.params.productId, product, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      getWithDetailProduct(req, res);
    }
  });
};

const deleteProduct = (req: Request, res: Response) => {
  Product.delete(req.params.productId, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      // res.status(200).json(data);
      deleteFromProduct(req, res);
    }
  });
};

export { getAll, create, getWithDetailProduct, update, deleteProduct };
