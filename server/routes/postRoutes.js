import express from "express";
import multer from "multer";
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const suffixName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, suffixName + "-" + file.originalname);
  },
});
const upload = multer({ storage });
router
  .post("/create", upload.single("image"), createPost)
  .get("/", getAllPosts)
  .patch("/:id", upload.single("image"), updatePost)
  .delete("/:id", deletePost);

export default router;
