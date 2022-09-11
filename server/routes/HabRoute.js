import { Router } from "express";
import IndexController from "../controller/IndexController";
import UpDonwloadHelper from "../middleware/UploadDonwloadHelper";

const router = Router();

router.post(
  "/",
  UpDonwloadHelper.uploadSingleFile,
  IndexController.HabCtrl.createHab,
  IndexController.HabImageCtrl.createHabImage
);

router.get("/", IndexController.HabCtrl.findAllPet);

export default router;
