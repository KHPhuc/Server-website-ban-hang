import { Router } from "express";
import customerRouter from "./Customer/customer.route";
import productRouter from "./Product/product.route";
import productTypeRouter from "./ProductType/product_type.route";
import detailProductTypeRouter from "./DetailProductType/detailProductType.route";
import detailProductRouter from "./DetailProduct/detailProduct.route";
import promotionRouter from "./Promotion/promotion.route";
import paymentMethodRouter from "./PaymentMethod/payment_method";

const apiRouter = Router();

apiRouter.use("/customer", customerRouter);
apiRouter.use("/product", productRouter);
apiRouter.use("/product_type", productTypeRouter);
apiRouter.use("/detail_product_type", detailProductTypeRouter);
apiRouter.use("/detail_product", detailProductRouter);
apiRouter.use("/promotion", promotionRouter);
apiRouter.use("/payment", paymentMethodRouter);

export default apiRouter;
