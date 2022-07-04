import { PrismaClient } from '@prisma/client';
import { Router } from "express";
const router = Router() ;
import  deviceRouter from './deviceRouter'
import  brantRouter from './brantRouter'
import  typeRouter from './typeRouter'
import  userRouter from './userRouter'

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brantRouter)
router.use('/device', deviceRouter)




export default router