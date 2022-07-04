import  jwt  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";


export default function(role:String){

    return function (req:Request, res:Response, next:NextFunction){
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
            const decoded:string | jwt.JwtPayload | any =  jwt.verify(token, String(process.env.JWT_SECRET))

            if(decoded.role !== role){
              return  res.status(403).json({msg:"No access"})
            }
            req.user = decoded; 
            next()
        
        } catch (error) {
            res.status(401).json({msg:"I was not allowed"})
            
        }
    }
}