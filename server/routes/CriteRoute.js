import { Router } from "express";
import IndexController from "../controller/IndexController";
import UpDonwloadHelper from "../middleware/UploadDonwloadHelper";

const router = Router();

router.post(
  "/",
  UpDonwloadHelper.uploadSingleFile,
  IndexController.CriteCtrl.createCrite,
  IndexController.CriteImageCtrl.createCriteImage,
  IndexController.CriteLinesCtrl.createCriteLines
);
router.get("/", IndexController.CriteCtrl.findAllCriteria);
export default router;
