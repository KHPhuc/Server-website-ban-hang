import { Router } from "express";
import { get } from "../../controller/address.controller";
import { authTokenUser } from "../../utils/token";

const addressRouter = Router();

addressRouter.get("/:customerId", authTokenUser, get);

export default addressRouter;
