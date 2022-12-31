"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../../controller/product.controller");
const productRouter = (0, express_1.Router)();
productRouter.get("/", product_controller_1.getAll);
exports.default = productRouter;
