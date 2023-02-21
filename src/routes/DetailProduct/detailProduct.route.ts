import { Router } from "express";
import {
  uploadImage,
  deleteImage,
  remove,
  update,
  updateAndDelete,
  create,
  getAllToShow,
  getFollowDetailPT,
  getProperties,
  searchProduct,
} from "../../controller/Product/detail_product.controller";
import { upload } from "../../upload/Upload";
import { authTokenUser, authTokenAdmin } from "../../utils/token";

const detailProductRouter = Router();

detailProductRouter.get("/:page", getAllToShow);
detailProductRouter.get("/productType/:detailPTId", getProperties);
detailProductRouter.post("/productType", getFollowDetailPT);
detailProductRouter.post("/search", searchProduct);

detailProductRouter.post(
  "/uploadImage",
  [authTokenAdmin, upload.single("myFile")],
  uploadImage
);
detailProductRouter.post("/deleteImage", authTokenAdmin, deleteImage);
detailProductRouter.post("/create", authTokenAdmin, create);
detailProductRouter.put(
  "/updateAndDelete/:detailProductId",
  authTokenAdmin,
  updateAndDelete
);
detailProductRouter.put("/update/:detailProductId", authTokenAdmin, update);
detailProductRouter.delete("/delete/:detailProductId", authTokenAdmin, remove);

export default detailProductRouter;
