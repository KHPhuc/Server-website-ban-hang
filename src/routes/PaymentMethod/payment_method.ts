import { Router } from "express";
import {
  getAll,
  getAllForUser,
  update,
} from "../../controller/payment_method.controller";
import { authTokenAdmin, authTokenUser } from "../../utils/token";

const paymentMethodRouter = Router();

paymentMethodRouter.get("/getForUser", getAllForUser);

paymentMethodRouter.get("", authTokenAdmin, getAll);
paymentMethodRouter.put("/update/:paymentId", authTokenAdmin, update);

export default paymentMethodRouter;
