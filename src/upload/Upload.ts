import multer from "multer";
import * as path from "path";

const fileStorageEngine = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, path.join(__dirname, "../public"));
  },
  filename: (req: any, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

export const upload = multer({ storage: fileStorageEngine });
