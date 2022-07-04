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
const authormiddleware_1 = __importDefault(require("../middleware/authormiddleware"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const generateJWT = (id, email, role) => {
    return jsonwebtoken_1.default.sign({ id: Number(id), email, role }, String(process.env.JWT_SECRET), { expiresIn: '24h' });
};
router.post("/sign-up", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return next(ApiError_1.default.badRequest({ error: "Sorry some cells were left blank" }));
        }
        const candidate = yield prisma.user.findUnique({ where: { email } });
        if (candidate) {
            return next(ApiError_1.default.badRequest("Sorry, please enter another email address where this email address is registered!"));
        }
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({ data: { name, email, role, password: hashpassword } });
        const backet = yield prisma.basket.create({ data: { userId: Number(user.id) } });
        const token = generateJWT(user.id, user.email, user.role);
        return res.json({ token });
    }
    catch (error) {
        console.log(error);
        next(ApiError_1.default.internal("Server Error"));
    }
}));
router.post("/sign-in", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return next(ApiError_1.default.internal("such emailed user is not registered!"));
        }
        let comparePassword = bcrypt_1.default.compare(password, user.password);
        if (!comparePassword) {
            return next(ApiError_1.default.internal("The password did not match. Please try again"));
        }
        const token = generateJWT(user.id, user.email, user.role);
        return res.json({ token });
    }
    catch (error) {
    }
}));
router.get("/auth", authormiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = generateJWT(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
}));
exports.default = router;
