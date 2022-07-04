"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(role) {
    return function (req, res, next) {
        var _a;
        if (req.method === "OPTIONS") {
            next();
        }
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Sunnatullox ")[1];
        if (!token) {
            res.status(401).json({ msg: "please register first" });
            res.send('/sign-up');
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET));
            if (decoded.role !== role) {
                return res.status(403).json({ msg: "No access" });
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({ msg: "I was not allowed" });
        }
    };
}
exports.default = default_1;
