import { Router } from "express";
import {
  getAll,
  create,
  update,
  updateAndDelete,
  remove,
} from "../../controller/promotion.controller";
import { authToken } from "../../utils/token";

const promotionRouter = Router();

promotionRouter.get("", authToken, getAll);
promotionRouter.post("/create", authToken, create);
promotionRouter.put("/update/:promotionId", authToken, update);
promotionRouter.post(
  "/updateAndDelete/:promotionId",
  authToken,
  updateAndDelete
);
promotionRouter.delete("/delete/:promotionId", authToken, remove);

export default promotionRouter;
