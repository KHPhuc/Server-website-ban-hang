import { Router } from "express";
import {
  uploadImage,
  deleteImage,
  remove,
} from "../../controller/Product/detail_product.controller";
import { upload } from "../../upload/Upload";
import { authToken } from "../../utils/token";

const detailProductRouter = Router();

detailProductRouter.post(
  "/uploadImage",
  [authToken, upload.single("myFile")],
  uploadImage
);
detailProductRouter.post("/deleteImage", authToken, deleteImage);
detailProductRouter.delete("/delete/:detailProductId", authToken, remove);

export default detailProductRouter;
