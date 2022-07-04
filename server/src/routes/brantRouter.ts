import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from "express";
const router = Router();
const prisma = new PrismaClient()


router.post('/', async(req:Request, res:Response)=>{
    const {name} = req.body;
    try {
         const brand = await prisma.brand.create({data:{name}});
         res.status(200).json(brand)
         return 
    } catch (error) {
        console.log(error);
        res.json(500).json("error")
     }
    
})
router.get('/', async(req:Request, res:Response)=>{
    
    try {
        const brands = await prisma.brand.findMany()
        if(brands){
            res.status(200).json(brands)
            return
        }else if(!brands){
            return res.status(400).json("category types not found")
        }
    } catch (error) {
        
    }
    
})





export default router