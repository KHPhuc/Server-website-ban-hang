import { Router } from "express";
import {
  login,
  register,
  getAll,
  create,
  ban,
  unBan,
} from "../../controller/customer.controller";
import { authToken } from "../../utils/token";

const customerRouter = Router();

customerRouter.get("/", authToken, getAll);
customerRouter.post("/create", authToken, create);
customerRouter.post("/login", login);
customerRouter.post("/register", register);
customerRouter.put("/ban/:customerId", authToken, ban);
customerRouter.put("/unBan/:customerId", authToken, unBan);

export default customerRouter;
