import { Router } from "express";
import {
  getAll,
  receiveResult,
  preCreateOrder,
  getAllForCustomers
} from "../../controller/Order/order";
import { authToken } from "../../utils/token";

const orderRouter = Router();

orderRouter.get("", getAll);
orderRouter.post("/orders", getAllForCustomers);
orderRouter.post("/receive_result", receiveResult);
orderRouter.post("/create", preCreateOrder);

export default orderRouter;
