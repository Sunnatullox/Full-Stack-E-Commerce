import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient()

class typeControllers{
    async create(req:Request, res:Response) {
      

   }

   async getAll(req:Request, res:Response){
       
   }
}


export default new typeControllers()