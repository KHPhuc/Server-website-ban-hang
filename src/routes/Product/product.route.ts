import { Router } from "express";
import {
  create,
  getWithDetailProduct,
  update,
  deleteProduct,
  getDetailProductByUrl,
} from "../../controller/Product/product.controller";
import { authTokenAdmin, authTokenUser } from "../../utils/token";

const productRouter = Router();

productRouter.get("/detail_product/:linkProduct", getDetailProductByUrl);

productRouter.get("/:page", authTokenAdmin, getWithDetailProduct);
productRouter.post("/create", authTokenAdmin, create);
productRouter.put("/update/:productId", authTokenAdmin, update);
productRouter.delete("/delete/:productId", authTokenAdmin, deleteProduct);

export default productRouter;
