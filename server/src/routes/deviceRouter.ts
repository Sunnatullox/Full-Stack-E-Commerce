import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import path from "path";
import uuid = require("uuid");
const router = Router();
import ApiError from "../error/ApiError";
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { name, price, brantId, typeId, description, title } = req.body;
    const { img }: any = req.files;

    let filesName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", filesName));

    const device = await prisma.device.create({
      data: {
        name: name,
        price: Number(price),
        brantId: Number(brantId),
        type_Id: Number(typeId),
        img: filesName,
      },
    });

      if (title || description) {
        return prisma.deviceInfo.create({
          data: {
            title:title,
            description:description,
            device_Id:Number(device.id),
          },
        })

    }
  return res.status(200).json(device);
  } catch (error: any) {
    next(ApiError.badRequest(error.messege));
  }
});
router.get("/", async (req: Request, res: Response) => {
  let { brantId, typeId, limit,  page }:any = req.query;
  let devices;
  page = page || 1
  limit = limit || 9
  let ofset:number = page * limit - limit

  if ( !brantId && !typeId ) {
    devices = await prisma.device.findMany({ skip:ofset, take: Number(limit) });
  }
  if (brantId && !typeId) {
    devices = await prisma.device.findMany({
      skip:ofset, take:Number(limit),
      where: { brantId: Number(brantId) },
    });
  }
  if (!brantId && typeId) {
    devices = await prisma.device.findMany({
      skip:ofset, take:Number(limit),
      where: { type_Id: Number(typeId) },
    });
  }

  if (brantId && typeId) {
    devices = await prisma.device.findMany({
      skip:ofset,take:Number(limit),
      where: { brantId: Number(brantId), type_Id: Number(typeId) },
    });
  }

  return res.json(devices);
});
router.get("/:id", async(req:Request, res:Response) =>{
    const { id }= req.params;
    const devices = await prisma.device.findUnique({
         where: { id:Number(id) },
         include:{info:true}
      })
      return res.json(devices)
});

export default router;
