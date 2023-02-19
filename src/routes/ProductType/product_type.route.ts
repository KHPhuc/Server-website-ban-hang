import { Router } from "express";
import {
  getAll,
  create,
  update,
  remove,
  getWithDetailProductType,
  // getExcelSample,
} from "../../controller/ProductType/product_type.controller";
import { authTokenAdmin, authTokenUser } from "../../utils/token";

const productTypeRouter = Router();

productTypeRouter.get("/all", getWithDetailProductType);

// productTypeRouter.get("/getExcel", getExcelSample);
productTypeRouter.get("/", authTokenAdmin, getAll);
productTypeRouter.post("/create", authTokenAdmin, create);
productTypeRouter.put("/update/:productTypeId", authTokenAdmin, update);
productTypeRouter.delete("/delete/:productTypeId", authTokenAdmin, remove);

export default productTypeRouter;
