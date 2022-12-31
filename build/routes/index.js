"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_route_1 = __importDefault(require("./Customer/customer.route"));
const product_route_1 = __importDefault(require("./Product/product.route"));
const product_type_route_1 = __importDefault(require("./ProductType/product_type.route"));
const detailProductType_1 = __importDefault(require("./DetailProductType/detailProductType"));
const apiRouter = (0, express_1.Router)();
apiRouter.use("/customer", customer_route_1.default);
apiRouter.use("/product", product_route_1.default);
apiRouter.use("/product_type", product_type_route_1.default);
apiRouter.use("/detail_product_type", detailProductType_1.default);
exports.default = apiRouter;
