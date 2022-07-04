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
const router = (0, express_1.Router)();
const checkRoleMiddleware_1 = __importDefault(require("../middleware/checkRoleMiddleware"));
const prisma = new client_1.PrismaClient();
router.post('/', (0, checkRoleMiddleware_1.default)('ADMIN'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const type = yield prisma.type.create({ data: { name: name } });
        res.status(200).json(type);
        return;
    }
    catch (error) {
        console.log(error);
        res.json(500).json("error");
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const types = yield prisma.type.findMany();
        if (types) {
            res.status(200).json(types);
            return;
        }
        else if (!types) {
            return res.status(400).json("category types not found");
        }
    }
    catch (error) {
    }
}));
exports.default = router;
