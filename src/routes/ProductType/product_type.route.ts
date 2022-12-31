import { Router } from "express";
import {
  getAll,
  create,
  update,
  remove,
} from "../../controller/product_type.controller";
import { authToken } from "../../utils/token";

const productTypeRouter = Router();

productTypeRouter.get("/", authToken, getAll);
productTypeRouter.post("/create", authToken, create);
productTypeRouter.put("/update/:productTypeId", authToken, update);
productTypeRouter.delete("/delete/:productTypeId", authToken, remove);

export default productTypeRouter;
