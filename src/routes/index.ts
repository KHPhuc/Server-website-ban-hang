import { Router } from "express";
import customerRouter from "./Customer/customer.route";
import productRouter from "./Product/product.route";
import productTypeRouter from "./ProductType/product_type.route";

const apiRouter = Router();

apiRouter.use("/product", productRouter);
apiRouter.use("/product_type", productTypeRouter);
apiRouter.use("/customer", customerRouter);

export default apiRouter;
