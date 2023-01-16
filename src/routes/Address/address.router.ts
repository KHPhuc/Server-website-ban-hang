import { Router } from "express";
import { get } from "../../controller/address.controller";
import { authToken } from "../../utils/token";

const addressRouter = Router();

addressRouter.get("/:customerId", authToken, get);

export default addressRouter;
