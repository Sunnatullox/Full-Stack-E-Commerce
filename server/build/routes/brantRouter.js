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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const brand = yield prisma.brand.create({ data: { name } });
        res.status(200).json(brand);
        return;
    }
    catch (error) {
        console.log(error);
        res.json(500).json("error");
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brands = yield prisma.brand.findMany();
        if (brands) {
            res.status(200).json(brands);
            return;
        }
        else if (!brands) {
            return res.status(400).json("category types not found");
        }
    }
    catch (error) {
    }
}));
exports.default = router;
