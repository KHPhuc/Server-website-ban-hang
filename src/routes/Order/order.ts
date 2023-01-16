import { Router } from "express";
import {
  getAll,
  receiveResult,
  createOrder,
} from "../../controller/Order/order";
import { authToken } from "../../utils/token";

const orderRouter = Router();

orderRouter.get("", getAll);
orderRouter.post("/receive_result", receiveResult);
orderRouter.post("/create", createOrder);

export default orderRouter;
