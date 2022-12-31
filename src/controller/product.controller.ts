import Product from "../model/product.model";

const getAll = (req: any, res: any) => {
  Product.getAll((err: any, data: any) => {
    if (err) {
      res.status(500).json({ message: "Lấy thất bại" });
    } else {
      res.status(200).json(data);
    }
  });
};

export { getAll };
