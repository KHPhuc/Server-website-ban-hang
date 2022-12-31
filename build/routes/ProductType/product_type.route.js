"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_type_controller_1 = require("../../controller/product_type.controller");
const token_1 = require("../../utils/token");
const productTypeRouter = (0, express_1.Router)();
productTypeRouter.get("/", token_1.authToken, product_type_controller_1.getAll);
productTypeRouter.post("/create", token_1.authToken, product_type_controller_1.create);
productTypeRouter.put("/update/:productTypeId", token_1.authToken, product_type_controller_1.update);
productTypeRouter.delete("/delete/:productTypeId", token_1.authToken, product_type_controller_1.remove);
exports.default = productTypeRouter;