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
const client_1 = require("@prisma/client");
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const uuid = require("uuid");
const router = (0, express_1.Router)();
const ApiError_1 = __importDefault(require("../error/ApiError"));
const prisma = new client_1.PrismaClient();
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, price, brantId, typeId, description, title } = req.body;
        const { img } = req.files;
        let filesName = uuid.v4() + ".jpg";
        img.mv(path_1.default.resolve(__dirname, "..", "static", filesName));
        const device = yield prisma.device.create({
            data: {
                name: name,
                price: Number(price),
                brantId: Number(brantId),
                type_Id: Number(typeId),
                img: filesName,
            },
        });
        if (title || description) {
            return prisma.deviceInfo.create({
                data: {
                    title: title,
                    description: description,
                    device_Id: Number(device.id),
                },
            });
        }
        return res.status(200).json(device);
    }
    catch (error) {
        next(ApiError_1.default.badRequest(error.messege));
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { brantId, typeId, limit, page } = req.query;
    let devices;
    page = page || 1;
    limit = limit || 9;
    let ofset = page * limit - limit;
    if (!brantId && !typeId) {
        devices = yield prisma.device.findMany({ skip: ofset, take: Number(limit) });
    }
    if (brantId && !typeId) {
        devices = yield prisma.device.findMany({
            skip: ofset, take: Number(limit),
            where: { brantId: Number(brantId) },
        });
    }
    if (!brantId && typeId) {
        devices = yield prisma.device.findMany({
            skip: ofset, take: Number(limit),
            where: { type_Id: Number(typeId) },
        });
    }
    if (brantId && typeId) {
        devices = yield prisma.device.findMany({
            skip: ofset, take: Number(limit),
            where: { brantId: Number(brantId), type_Id: Number(typeId) },
        });
    }
    return res.json(devices);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const devices = yield prisma.device.findUnique({
        where: { id: Number(id) },
        include: { info: true }
    });
    return res.json(devices);
}));
exports.default = router;
