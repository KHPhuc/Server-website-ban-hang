import { Router } from "express";
import { getAll, create } from "../../controller/product_type.controller";
import { authToken } from "../../utils/token";

const productTypeRouter = Router();

productTypeRouter.get("/", getAll);
productTypeRouter.post("/create", authToken, create);

export default productTypeRouter;
