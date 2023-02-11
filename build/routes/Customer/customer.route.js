"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_controller_1 = require("../../controller/customer.controller");
const token_1 = require("../../utils/token");
const customerRouter = (0, express_1.Router)();
customerRouter.get("/", token_1.authToken, customer_controller_1.getAll);
customerRouter.get("/info/:customerId", token_1.authToken, customer_controller_1.getInfo);
customerRouter.post("/create", token_1.authToken, customer_controller_1.create);
customerRouter.post("/login", customer_controller_1.login);
customerRouter.post("/changePassword", token_1.authToken, customer_controller_1.changePassword);
customerRouter.post("/updateInfo/:customerId", token_1.authToken, customer_controller_1.updateInfo);
customerRouter.post("/register", customer_controller_1.register);
customerRouter.put("/ban/:customerId", token_1.authToken, customer_controller_1.ban);
customerRouter.put("/unBan/:customerId", token_1.authToken, customer_controller_1.unBan);
exports.default = customerRouter;
