import  jwt  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";


export default function (req:Request, res:Response, next:NextFunction){
    if(req.method === "OPTIONS"){
        next()
    }

    const token = req.headers.authorization?.split("Sunnatullox ")[1]
    if(!token){
        res.status(401).json({msg:"please register first"})
       res.send('/sign-up')
        return 
    }
    try {
        const decoded:string | jwt.JwtPayload =  jwt.verify(token, String(process.env.JWT_SECRET))
// agarda req.user da hatolik bo'lsa node_modules/@types/express/index.d.ts ga kirib nastroyka userni quyish kerak mishkani req,userni ustiga olib borsa stringmi yokiy any nima quyish kerak ligini uzi kursatadi
        req.user = decoded; 
        next()
    } catch (error) {
        res.status(401).json({msg:"I was not allowed"})
        
    }
}


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