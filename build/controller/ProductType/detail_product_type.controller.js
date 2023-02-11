"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportExcel = exports.getAllFollowPT = exports.remove = exports.update = exports.create = exports.getByProductTypeId = void 0;
const detail_product_type_model_1 = __importDefault(require("../../model/ProductType/detail_product_type.model"));
const id_1 = require("../../utils/id");
var XLSX = require("xlsx");
const prefix = "DPT";
const getByProductTypeId = (req, res) => {
    detail_product_type_model_1.default.getByProductTypeId(req.params.productTypeId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        else {
            res.status(200).json(data);
        }
    });
};
exports.getByProductTypeId = getByProductTypeId;
const getAllFollowPT = (req, res, data) => __awaiter(void 0, void 0, void 0, function* () {
    var promises = data.map((e) => {
        return new Promise((res, rej) => {
            detail_product_type_model_1.default.getByProductTypeId(e.productTypeId, (err, dt) => {
                if (err) {
                    rej(err);
                }
                else {
                    res(dt);
                }
            });
        }).then((res) => {
            e.detailProductType = res;
            return e;
        });
    });
    Promise.all(promises)
        .then((dt) => {
        // console.log(res);
        res.status(200).json(dt);
    })
        .catch((err) => {
        res.status(500).json();
    });
});
exports.getAllFollowPT = getAllFollowPT;
const exportExcel = (req, res, data) => __awaiter(void 0, void 0, void 0, function* () {
    var promises = data.map((e) => {
        return new Promise((res, rej) => {
            detail_product_type_model_1.default.getByProductTypeId(e.productTypeId, (err, dt) => {
                if (err) {
                    rej(err);
                }
                else {
                    res(dt);
                }
            });
        }).then((res) => {
            e.detailProductType = res;
            return e;
        });
    });
    Promise.all(promises)
        .then((dt) => {
        // console.log(res);
        let cache = dt
            .map((e, i) => {
            return e.detailProductType.map((e1, i1) => {
                return i1 === 0
                    ? {
                        "Loại chính": e.productTypeName,
                        "Loại con": e1.detailPTName,
                        "Mã loại con": e1.detailPTId,
                    }
                    : {
                        "Loại chính": "",
                        "Loại con": e1.detailPTName,
                        "Mã loại con": e1.detailPTId,
                    };
            });
        })
            .flat();
        const workSheet = XLSX.utils.json_to_sheet(cache);
        const workBook = XLSX.utils.book_new();
        workSheet["A1"].s = {
            font: {
                bold: true,
            },
        };
        XLSX.utils.book_append_sheet(workBook, workSheet, "Product Type");
        const buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        res.setHeader("Content-Disposition", 'attachment; filename="Product Type.xlsx"');
        res.setHeader("Content-Type", "application/vnd.ms-excel");
        res.end(buf);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json();
    });
});
exports.exportExcel = exportExcel;
const create = (req, res) => {
    const detailProductType = new detail_product_type_model_1.default(req.body);
    detailProductType.detailPTId = (0, id_1.generateId)(prefix);
    detail_product_type_model_1.default.create(detailProductType, (err, data) => {
        if (err) {
            //   res.status(500).json();
            console.log(err);
        }
        else {
            //   res.status(200).json(data);
            req.params.productTypeId = detailProductType.productTypeId;
            getByProductTypeId(req, res);
        }
    });
};
exports.create = create;
const update = (req, res) => {
    const detailProductType = new detail_product_type_model_1.default(req.body);
    detail_product_type_model_1.default.update(req.params.detailPTId, detailProductType, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            // res.status(200).json(data);
            detail_product_type_model_1.default.getByDetailPTId(req.params.detailPTId, (err, data) => {
                if (err) {
                }
                else {
                    req.params.productTypeId = data[0].productTypeId;
                    getByProductTypeId(req, res);
                }
            });
        }
    });
};
exports.update = update;
const remove = (req, res) => {
    detail_product_type_model_1.default.getByDetailPTId(req.params.detailPTId, (err, data) => {
        if (err) {
        }
        else {
            req.params.productTypeId = data[0].productTypeId;
        }
    });
    detail_product_type_model_1.default.remove(req.params.detailPTId, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            getByProductTypeId(req, res);
        }
    });
};
exports.remove = remove;
