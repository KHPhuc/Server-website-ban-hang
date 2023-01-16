import { Router } from "express";
import {
  addCart,
  getByCId,
  getDetailCartById,
  updateCart,
  deteleCart,
} from "../../controller/cart.controller";
import { authToken } from "../../utils/token";

const cartRouter = Router();

cartRouter.get("/:customerId", authToken, getByCId);
cartRouter.get("/get_detail_cart/:customerId", authToken, getDetailCartById);
cartRouter.post("/create", authToken, addCart);
cartRouter.put("/update", authToken, updateCart);
cartRouter.post("/delete", authToken, deteleCart);

export default cartRouter;
