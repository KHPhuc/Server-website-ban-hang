import { Router } from "express";
import { login, register, getAll } from "../../controller/customer.controller";
import { authToken } from "../../utils/token";

const customerRouter = Router();

customerRouter.get("/", authToken, getAll);
customerRouter.post("/login", login);
customerRouter.post("/register", register);

export default customerRouter;
