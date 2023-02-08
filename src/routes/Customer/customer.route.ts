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
  updateInfo
} from "../../controller/customer.controller";
import { authToken } from "../../utils/token";

const customerRouter = Router();

customerRouter.get("/", authToken, getAll);
customerRouter.get("/info/:customerId", authToken, getInfo);
customerRouter.post("/create", authToken, create);
customerRouter.post("/login", login);
customerRouter.post("/changePassword", authToken, changePassword);
customerRouter.post("/updateInfo/:customerId", authToken, updateInfo);
customerRouter.post("/register", register);
customerRouter.put("/ban/:customerId", authToken, ban);
customerRouter.put("/unBan/:customerId", authToken, unBan);

export default customerRouter;
