import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from "express";
const router = Router();
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
const prisma = new PrismaClient()

router.post('/',checkRoleMiddleware('ADMIN'), async (req:Request, res:Response) => {
    const {name} = req.body;
    try {
         const type = await prisma.type.create({data:{name:name}});
         res.status(200).json(type)
         return 
    } catch (error) {
        console.log(error);
        res.json(500).json("error")
     }
})

router.get('/', async(req:Request, res:Response)=>{
    
    try {
        const types = await prisma.type.findMany()
        if(types){
            res.status(200).json(types)
            return
        }else if(!types){
            return res.status(400).json("category types not found")
        }
    } catch (error) {
        
    }
    
})





export default router