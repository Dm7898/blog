import express from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  getPostComments,
} from "../controllers/commentController.js";

const router = express.Router();
router
  .post("/:postid/comment", createComment)
  .get("/:postId/comment", getPostComments)
  .get("/", getAllComments)
  .delete("/comment/:id", deleteComment);

export default router;
