import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import authormiddleware from "../middleware/authormiddleware";
import ApiError from "../error/ApiError";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = Router();
const prisma = new PrismaClient();


const generateJWT  = (id?:Number, email?:String, role?:String) =>{
   return jwt.sign(
        {id:Number(id), email, role},
        String(process.env.JWT_SECRET),
        {expiresIn:'24h'}
        )
}

router.post(
  "/sign-up",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {name, email, password, role } = req.body;
      if (!name || !email || !password) {
        return next(
          ApiError.badRequest({ error: "Sorry some cells were left blank" })
        );
      }
      const candidate = await prisma.user.findUnique({ where: { email } });
      if (candidate) {
        return next(
          ApiError.badRequest(
            "Sorry, please enter another email address where this email address is registered!"
          )
        );
      }

      const hashpassword = await bcrypt.hash(password, 10)
      const user:any = await prisma.user.create({data:{name, email, role, password:hashpassword}})
      // const backet = await prisma.basket.create({data:{userId:Number(user.id)}})
      const token = generateJWT(user.id, user.email, user.role)
          return res.json({token})

    } catch (error) {
        console.log(error);
        next(ApiError.internal("Server Error"))
    }
  }
);

router.post(
  "/sign-in",
  async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email,password}= req.body;
            const user = await prisma.user.findUnique({where:{email}})
            if(!user){
                return next(ApiError.internal("such emailed user is not registered!"))
            }

            let comparePassword = bcrypt.compare(password, user.password)
            if(!comparePassword){
                return next(ApiError.internal("The password did not match. Please try again"))
            }
            const token = generateJWT(user.id, user.email, user.role)
            return res.json({token})

        } catch (error) {
            
        }
  }
);
router.get("/auth",authormiddleware ,async (req:Request, res:Response, next:NextFunction) => {

  const token = generateJWT(req.user.id, req.user.email, req.user.role)
  return res.json({token})

});

export default router;
