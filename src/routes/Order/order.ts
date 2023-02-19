import { Router } from "express";
import {
  getAll,
  receiveResult,
  preCreateOrder,
  getAllForCustomers,
  updateOrderStatus,
  cancelOrder,
} from "../../controller/Order/order";
import { authTokenAdmin, authTokenUser } from "../../utils/token";

const orderRouter = Router();

orderRouter.post("/receive_result", receiveResult);

orderRouter.post("/create", authTokenUser, preCreateOrder);
orderRouter.post("/orders", authTokenUser, getAllForCustomers);
orderRouter.post("/cancelOrder", authTokenUser, cancelOrder);

orderRouter.post("", authTokenAdmin, getAll);
orderRouter.post("/updateOrder", authTokenAdmin, updateOrderStatus);

export default orderRouter;
