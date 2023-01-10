import { Router } from "express";
import {
  getByProductTypeId,
  create,
  update,
  remove,
} from "../../controller/ProductType/detail_product_type.controller";
import { authToken } from "../../utils/token";

const detailProductTypeRouter = Router();

detailProductTypeRouter.get("/:productTypeId", authToken, getByProductTypeId);
detailProductTypeRouter.post("/create", authToken, create);
detailProductTypeRouter.put("/update/:detailPTId", authToken, update);
detailProductTypeRouter.delete("/delete/:detailPTId", authToken, remove);

export default detailProductTypeRouter;
