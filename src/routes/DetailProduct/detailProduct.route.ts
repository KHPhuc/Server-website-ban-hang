import { Router } from "express";
import {
  uploadImage,
  deleteImage,
  remove,
  update,
  updateAndDelete,
  create,
  getAllToShow,
  getFollowDetailPT
} from "../../controller/Product/detail_product.controller";
import { upload } from "../../upload/Upload";
import { authToken } from "../../utils/token";

const detailProductRouter = Router();

detailProductRouter.get("/:page", getAllToShow);
detailProductRouter.get("/productType/:detailPTId", getFollowDetailPT);
detailProductRouter.post(
  "/uploadImage",
  [authToken, upload.single("myFile")],
  uploadImage
);
detailProductRouter.post("/deleteImage", authToken, deleteImage);
detailProductRouter.post("/create", authToken, create);
detailProductRouter.put(
  "/updateAndDelete/:detailProductId",
  authToken,
  updateAndDelete
);
detailProductRouter.put("/update/:detailProductId", authToken, update);
detailProductRouter.delete("/delete/:detailProductId", authToken, remove);

export default detailProductRouter;
