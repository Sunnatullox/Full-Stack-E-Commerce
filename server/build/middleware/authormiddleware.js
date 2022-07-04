"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(req, res, next) {
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
        // agarda req.user da hatolik bo'lsa node_modules/@types/express/index.d.ts ga kirib nastroyka userni quyish kerak mishkani req,userni ustiga olib borsa stringmi yokiy any nima quyish kerak ligini uzi kursatadi
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ msg: "I was not allowed" });
    }
}
exports.default = default_1;
//req.user nastroyka
/* import * as bodyParser from 'body-parser';
import * as serveStatic from 'serve-static';
import * as core from 'express-serve-static-core';
import * as qs from 'qs';
import express from "express";


declare global {
  namespace Express {
    interface Request {
      user?: Record<string | JwtPayload>
    }
  }
} */ 
