import { Router } from "express";
import {
  addCart,
  getByCId,
  getDetailCartById,
  updateCart,
  deteleCart,
} from "../../controller/cart.controller";
import { authTokenUser } from "../../utils/token";

const cartRouter = Router();

cartRouter.get("/:customerId", authTokenUser, getByCId);
cartRouter.post("/create", authTokenUser, addCart);
cartRouter.get(
  "/get_detail_cart/:customerId",
  authTokenUser,
  getDetailCartById
);
cartRouter.put("/update", authTokenUser, updateCart);
cartRouter.post("/delete", authTokenUser, deteleCart);

export default cartRouter;
