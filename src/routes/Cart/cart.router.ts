import { Router } from "express";
import {
  addCart,
  getByCId,
  getDetailCartById,
} from "../../controller/cart.controller";
import { authToken } from "../../utils/token";

const cartRouter = Router();

cartRouter.get("/:customerId", authToken, getByCId);
cartRouter.get("/get_detail_cart/:customerId", authToken, getDetailCartById);
cartRouter.post("/create", authToken, addCart);

export default cartRouter;
