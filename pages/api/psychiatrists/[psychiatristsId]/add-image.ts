import multer from "multer";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { authService } from "@/backends/services/auth.service";
import mongooseService from "@/backends/services/mongoose.service";
import { userService } from "@/backends/services/user.service";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  fileFilter(req, file, cb) {
    if (
      file.originalname.toString().toLowerCase().endsWith(".png") ||
      file.originalname.toString().toLowerCase().endsWith(".jpeg") ||
      file.originalname.toString().toLowerCase().endsWith(".jpg") ||
      file.originalname.toString().toLowerCase().endsWith(".webp")
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      if (!file) {
        return cb(
          Error("Please upload File.", {
            cause: "File required",
          }),
          path.join(process.cwd(), "public/images")
        );
      }
      const payload = await authService.verifyToken(req.headers.authorization!);

      if (!payload)
        return cb(
          Error("Please login with correct credientials.", {
            cause: "Auth required",
          }),
          path.join(process.cwd(), "public/images")
        );
      if (payload.role != "admin")
        return cb(
          Error("Please login with correct credientials.", {
            cause: "Auth required",
          }),
          path.join(process.cwd(), "public/uploads/psychiatrists")
        );
      cb(null, path.join(process.cwd(), "public/uploads/psychiatrists"));
    },
    filename: async (req, file, cb) => {
      const fileName = Date.now() + file.originalname;
      if (!req.query.psychiatristsId)
        return cb(Error("missing psychiatristsId"), fileName);
      mongooseService;
      const psychiatrists = await userService.addPsychiatristsImage(
        req.query.psychiatristsId!.toString(),
        "/uploads/psychiatrists/" + fileName
      );
      if (!psychiatrists) return cb(Error("error adding image"), fileName);

      cb(null, fileName);
    },
  }),
});
const handler = nc({
  onError: (err, req, res: NextApiResponse, next) => {
    return res.status(401).json({ message: err.message });
  },
  onNoMatch: (req, res) => {
    return res.status(401).json({ message: "METHOD NOT ALLOWED" });
  },
})
  .use(upload.single("image"))
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ message: "image uploaded" });
  });

export default handler;
