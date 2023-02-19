import { Router } from "express";
import {
  getAll,
  create,
  update,
  updateAndDelete,
  remove,
} from "../../controller/promotion.controller";
import { authTokenAdmin, authTokenUser } from "../../utils/token";

const promotionRouter = Router();

promotionRouter.get("", authTokenAdmin, getAll);
promotionRouter.post("/create", authTokenAdmin, create);
promotionRouter.put("/update/:promotionId", authTokenAdmin, update);
promotionRouter.post(
  "/updateAndDelete/:promotionId",
  authTokenAdmin,
  updateAndDelete
);
promotionRouter.delete("/delete/:promotionId", authTokenAdmin, remove);

export default promotionRouter;
