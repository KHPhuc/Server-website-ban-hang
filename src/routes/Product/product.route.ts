import { Router } from "express";
import {
  create,
  getWithDetailProduct,
  update,
  deleteProduct,
  getDetailProductByUrl,
} from "../../controller/Product/product.controller";
import { authToken } from "../../utils/token";

const productRouter = Router();

productRouter.get("/", authToken, getWithDetailProduct);
productRouter.get("/detail_product/:linkProduct", getDetailProductByUrl);
productRouter.post("/create", authToken, create);
productRouter.put("/update/:productId", authToken, update);
productRouter.delete("/delete/:productId", authToken, deleteProduct);

export default productRouter;
