import { Router } from "express";
import { getAll, receiveResult } from "../../controller/Order/order";
import { authToken } from "../../utils/token";

const orderRouter = Router();

orderRouter.get("", authToken, getAll);
orderRouter.post("/receive_result", receiveResult);

export default orderRouter;
