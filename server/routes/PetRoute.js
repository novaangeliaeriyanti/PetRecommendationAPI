import { Router } from "express";
import IndexController from "../controller/IndexController";
import UpDonwloadHelper from "../middleware/UploadDonwloadHelper";

const router = Router();

router.post(
  "/",
  UpDonwloadHelper.uploadSingleFile,
  IndexController.PetCtrl.createPet,
  IndexController.PetImageCtrl.createPetImage
);

router.post(
  "/critelines",
  UpDonwloadHelper.uploadSingleFile,
  IndexController.PetCtrl.createPet,
  IndexController.PetImageCtrl.createPetImageV2,
  IndexController.CriteLinesCtrl.createPetLines
);

router.get("/:id", IndexController.PetCtrl.findPet);

router.put("/:id",IndexController.PetCtrl.updatePet,IndexController.CriteLinesCtrl.updatePetLines);

export default router;
