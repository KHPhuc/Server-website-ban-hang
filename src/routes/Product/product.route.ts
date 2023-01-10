import { Router } from "express";
import {
  //   getAll,
  create,
  getWithDetailProduct,
  update,
  deleteProduct,
} from "../../controller/Product/product.controller";
import { authToken } from "../../utils/token";

const productRouter = Router();

productRouter.get("/", authToken, getWithDetailProduct);
productRouter.post("/create", authToken, create);
productRouter.put("/update/:productId", authToken, update);
productRouter.delete("/delete/:productId", authToken, deleteProduct);

export default productRouter;
