"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.update = exports.updateAndDelete = exports.remove = exports.deleteFromProduct = exports.getAllWithProduct = exports.deleteImage = exports.uploadImage = exports.createFromProduct = exports.getFollowDetailPT = exports.getAllToShow = void 0;
const detail_product_model_1 = __importDefault(require("../../model/Product/detail_product.model"));
const id_1 = require("../../utils/id");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const product_controller_1 = require("./product.controller");
const prefix = "DP";
const uploadImage = (req, res) => {
    var _a;
    //   console.log(req.body, req.file);
    //   console.log(path.join(__dirname, "../public/") + req.file?.filename);
    if (req.file) {
        res.status(200).json((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
    }
    else {
        res.status(500).json();
    }
};
exports.uploadImage = uploadImage;
const deleteImage = (req, res) => {
    let link = path.join(__dirname, "../../public/") + req.body.nameFile;
    fs.unlink(link, (err) => {
        if (err)
            throw err;
    });
};
exports.deleteImage = deleteImage;
const createFromProduct = (id, req, res) => {
    let convert = req.body
        .map((e) => {
        return e.subDetail.map((e1) => {
            return {
                detailProductId: (0, id_1.generateId)(prefix),
                productId: id,
                image: e.image,
                color: e.color,
                size: e1.size,
                quantity: e1.quantity,
                originalPrice: e1.originalPrice,
                currentPrice: e1.currentPrice,
            };
        });
    })
        .flat();
    let promises = convert.map((e) => {
        return new Promise((res, rej) => {
            let detailProduct = new detail_product_model_1.default(e);
            detail_product_model_1.default.create(detailProduct, (err, data) => {
                if (err) {
                    rej(err);
                }
                else {
                    res(data);
                }
            });
        });
    });
    Promise.all(promises)
        .then((dt) => {
        (0, product_controller_1.getWithDetailProduct)(req, res);
        // res.status(200).json();
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json();
    });
};
exports.createFromProduct = createFromProduct;
const create = (req, res) => {
    let detailProduct = new detail_product_model_1.default(req.body);
    detailProduct.detailProductId = (0, id_1.generateId)(prefix);
    detail_product_model_1.default.create(detailProduct, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            (0, product_controller_1.getWithDetailProduct)(req, res);
        }
    });
};
exports.create = create;
const getAllWithProduct = (req, res, data) => {
    var promises = data.map((e) => {
        return new Promise((res, rej) => {
            detail_product_model_1.default.getAllWithProductId(e.productId, (err, dt) => {
                if (err) {
                    rej(err);
                }
                else {
                    res(dt);
                }
            });
        }).then((res) => {
            // console.log(res);
            // e.detailProduct = res;
            let cache = res;
            var iStart = 0;
            var count = 1;
            cache.forEach((x, i) => {
                if (i === 0) {
                }
                else {
                    if (x.color === cache[i - 1].color) {
                        count += 1;
                    }
                    else {
                        cache[iStart].span = count;
                        count = 1;
                        iStart = i;
                    }
                }
            });
            cache[iStart].span = count;
            e.detailProduct = cache;
            // e.detailProduct = [];
            // res.forEach((x: any) => {
            //   const index = e.detailProduct.findIndex(
            //     (y: any) => y.color === x.color
            //   );
            //   // console.log(e);
            //   if (!index || index === -1) {
            //     e.detailProduct.push({
            //       color: x.color,
            //       image: x.image,
            //       detailProductId: x.detailProductId,
            //       subDetail: [
            //         {
            //           size: x.size,
            //           quantity: x.quantity,
            //           originalPrice: x.originalPrice,
            //           currentPrice: x.currentPrice,
            //         },
            //       ],
            //     });
            //   } else {
            //     e.detailProduct[index].subDetail.push({
            //       size: x.size,
            //       quantity: x.quantity,
            //       originalPrice: x.originalPrice,
            //       currentPrice: x.currentPrice,
            //     });
            //   }
            // });
            return e;
        });
    });
    Promise.all(promises)
        .then((dt) => {
        // console.log(dt);
        res.status(200).json(dt);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json();
    });
};
exports.getAllWithProduct = getAllWithProduct;
const getAllToShow = (req, res) => {
    detail_product_model_1.default.getAllToShow(req.params.page, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        else {
            res.status(200).json(data);
        }
    });
};
exports.getAllToShow = getAllToShow;
const getFollowDetailPT = (req, res) => {
    detail_product_model_1.default.getFollowDetailPT(req.params.detailPTId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        else {
            res.status(200).json(data);
        }
    });
};
exports.getFollowDetailPT = getFollowDetailPT;
const update = (req, res) => {
    const detailProduct = new detail_product_model_1.default(req.body);
    // detailProduct.detailProductId = generateId(prefix);
    detail_product_model_1.default.update(req.params.detailProductId, detailProduct, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            (0, product_controller_1.getWithDetailProduct)(req, res);
        }
    });
};
exports.update = update;
const updateAndDelete = (req, res) => {
    const detailProduct = new detail_product_model_1.default(req.body);
    detailProduct.detailProductId = (0, id_1.generateId)(prefix);
    detail_product_model_1.default.delete(req.params.detailProductId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            // res.status(200).json(data);
            // getWithDetailProduct(req, res);
            detail_product_model_1.default.create(detailProduct, (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    (0, product_controller_1.getWithDetailProduct)(req, res);
                }
            });
        }
    });
};
exports.updateAndDelete = updateAndDelete;
const deleteFromProduct = (req, res) => {
    detail_product_model_1.default.deleteFromProduct(req.params.productId, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            // res.status(200).json(data);
            (0, product_controller_1.getWithDetailProduct)(req, res);
        }
    });
};
exports.deleteFromProduct = deleteFromProduct;
const remove = (req, res) => {
    detail_product_model_1.default.delete(req.params.detailProductId, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            // res.status(200).json(data);
            (0, product_controller_1.getWithDetailProduct)(req, res);
        }
    });
};
exports.remove = remove;
