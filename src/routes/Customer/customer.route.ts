import { Router } from "express";
import {
  login,
  register,
  getAll,
  create,
  ban,
  unBan,
  changePassword,
  getInfo,
  updateInfo,
  logout,
} from "../../controller/customer.controller";
import { authTokenAdmin, authTokenUser } from "../../utils/token";

const customerRouter = Router();

customerRouter.post("/login", login);
customerRouter.post("/register", register);
customerRouter.get("/logout", logout);

customerRouter.get("/info/:customerId", authTokenUser, getInfo);
customerRouter.post("/updateInfo/:customerId", authTokenUser, updateInfo);
customerRouter.post("/changePassword", authTokenUser, changePassword);

customerRouter.get("/:page", authTokenAdmin, getAll);
customerRouter.post("/create", authTokenAdmin, create);
customerRouter.put("/ban/:customerId", authTokenAdmin, ban);
customerRouter.put("/unBan/:customerId", authTokenAdmin, unBan);

export default customerRouter;
