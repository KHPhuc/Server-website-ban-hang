"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_controller_1 = require("../../controller/address.controller");
const token_1 = require("../../utils/token");
const addressRouter = (0, express_1.Router)();
addressRouter.get("/:customerId", token_1.authToken, address_controller_1.get);
exports.default = addressRouter;
