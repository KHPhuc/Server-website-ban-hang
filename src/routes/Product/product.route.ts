import { Router } from "express";
import { getAll } from "../../controller/product.controller";

const productRouter = Router();

productRouter.get("/", getAll);

export default productRouter;
