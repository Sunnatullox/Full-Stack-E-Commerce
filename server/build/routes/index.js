"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const deviceRouter_1 = __importDefault(require("./deviceRouter"));
const brantRouter_1 = __importDefault(require("./brantRouter"));
const typeRouter_1 = __importDefault(require("./typeRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
router.use('/user', userRouter_1.default);
router.use('/type', typeRouter_1.default);
router.use('/brand', brantRouter_1.default);
router.use('/device', deviceRouter_1.default);
exports.default = router;
