import { Router } from "express";
import IndexController from "../controller/IndexController";
import UpDonwloadHelper from "../middleware/UploadDonwloadHelper";
const router = Router();

router.post("/", IndexController.RecResultCtrl.recomResult);

export default router;
