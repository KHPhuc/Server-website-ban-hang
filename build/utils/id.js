"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
const uniqid_1 = __importDefault(require("uniqid"));
const generateId = (header) => {
    return (0, uniqid_1.default)(`${header}-`);
};
exports.generateId = generateId;
// A - address
// C - customer
// DP - detail product
// DPT
// 0 - order
// PM - payment method
// P - product
// PT - product type
// S - shipping
