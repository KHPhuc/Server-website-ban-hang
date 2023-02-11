"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.update = exports.getWithDetailProduct = exports.create = exports.getAll = exports.getDetailProductByUrl = void 0;
const product_model_1 = __importDefault(require("../../model/Product/product.model"));
const id_1 = require("../../utils/id");
const detail_product_controller_1 = require("./detail_product.controller");
const prefix = "P";
const getAll = (req, res) => {
    product_model_1.default.getAll((err, data) => {
        if (err) {
            res.status(500).json({ message: "Lấy thất bại" });
        }
        else {
            res.status(200).json(data);
        }
    });
};
exports.getAll = getAll;
const getDetailProductByUrl = (req, res) => {
    product_model_1.default.getDetailProduct(req.params.linkProduct, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            if (data.length) {
                let cache = {
                    productId: data[0].productId,
                    productName: data[0].productName,
                    description: data[0].description,
                    totalScore: data[0].totalScore,
                    totalComment: data[0].totalComment,
                    detailProduct: [],
                };
                data.forEach((e) => {
                    let index = cache.detailProduct.findIndex((x) => x.color === e.color);
                    if (index === -1) {
                        cache.detailProduct.push({
                            color: e.color,
                            image: e.image,
                            sizes: [
                                {
                                    detailProductId: e.detailProductId,
                                    size: e.size,
                                    originalPrice: e.originalPrice,
                                    currentPrice: e.currentPrice,
                                    quantity: e.quantity,
                                },
                            ],
                        });
                    }
                    else {
                        cache.detailProduct[index].sizes.push({
                            detailProductId: e.detailProductId,
                            size: e.size,
                            originalPrice: e.originalPrice,
                            currentPrice: e.currentPrice,
                            quantity: e.quantity,
                        });
                    }
                });
                res.status(200).json(cache);
            }
            else {
                res.status(200).json("");
            }
        }
    });
};
exports.getDetailProductByUrl = getDetailProductByUrl;
const getWithDetailProduct = (req, res) => {
    product_model_1.default.getAllWithDP((err, data) => {
        if (err) {
            res.status(500).json({ message: "Lấy thất bại" });
        }
        else {
            (0, detail_product_controller_1.getAllWithProduct)(req, res, data);
        }
    });
};
exports.getWithDetailProduct = getWithDetailProduct;
const create = (req, res) => {
    const product = new product_model_1.default(req.body);
    product.productId = (0, id_1.generateId)(prefix);
    product_model_1.default.findNameProduct(product.productName, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            if (data.length) {
                res.status(500).json({ message: "Đã có tên sản phẩm" });
            }
            else {
                product_model_1.default.create(product, (err, data) => {
                    if (err) {
                        res.status(500).json();
                    }
                    else {
                        req.body = req.body.detailProduct;
                        (0, detail_product_controller_1.createFromProduct)(product.productId, req, res);
                    }
                });
            }
        }
    });
};
exports.create = create;
const update = (req, res) => {
    const product = new product_model_1.default(req.body);
    console.log(product);
    product_model_1.default.update(req.params.productId, product, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            getWithDetailProduct(req, res);
        }
    });
};
exports.update = update;
const deleteProduct = (req, res) => {
    product_model_1.default.delete(req.params.productId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            // res.status(200).json(data);
            (0, detail_product_controller_1.deleteFromProduct)(req, res);
        }
    });
};
exports.deleteProduct = deleteProduct;
