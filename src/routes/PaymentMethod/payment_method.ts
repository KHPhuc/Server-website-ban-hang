import { Router } from "express";
import { getAll, update } from "../../controller/payment_method.controller";
import { authToken } from "../../utils/token";

const paymentMethodRouter = Router();

paymentMethodRouter.get("", authToken, getAll);
paymentMethodRouter.put("/update/:paymentId", authToken, update);

export default paymentMethodRouter;
