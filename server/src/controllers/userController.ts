import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';


class userControllers{
    async registration (req:Request, res:Response) {
       
   }

   async login(req:Request, res:Response){
       
   }

   async check(req:Request, res:Response, next:NextFunction){
   
   }
}


export default new userControllers()