import { Router } from "express";
import {
  getAll,
  create,
  update,
  remove,
  getWithDetailProductType,
  // getExcelSample,
} from "../../controller/ProductType/product_type.controller";
import { authToken } from "../../utils/token";

const productTypeRouter = Router();

productTypeRouter.get("/", authToken, getAll);
productTypeRouter.get("/all", authToken, getWithDetailProductType);
// productTypeRouter.get("/getExcel", getExcelSample);
productTypeRouter.post("/create", authToken, create);
productTypeRouter.put("/update/:productTypeId", authToken, update);
productTypeRouter.delete("/delete/:productTypeId", authToken, remove);

export default productTypeRouter;
