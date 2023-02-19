import { Router } from "express";
import {
  getByProductTypeId,
  create,
  update,
  remove,
} from "../../controller/ProductType/detail_product_type.controller";
import { authTokenAdmin, authTokenUser } from "../../utils/token";

const detailProductTypeRouter = Router();

detailProductTypeRouter.get("/:productTypeId", getByProductTypeId);
detailProductTypeRouter.post("/create", authTokenAdmin, create);
detailProductTypeRouter.put("/update/:detailPTId", authTokenAdmin, update);
detailProductTypeRouter.delete("/delete/:detailPTId", authTokenAdmin, remove);

export default detailProductTypeRouter;
