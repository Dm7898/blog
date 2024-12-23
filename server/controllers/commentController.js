import mongoose from "mongoose";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req, res) => {
  const { postid } = req.params;
  const { user, text } = req.body;
  if (!mongoose.Types.ObjectId.isValid(postid)) {
    return res.status(400).json({
      message: "Invalid post id format",
    });
  }

  if (!postid || !user || !text) {
    return res.status(400).json({
      message: "post, user, and text fields are required",
    });
  }

  try {
    const post = await Post.findOne({ _id: postid });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const newComment = new Comment({
      postId: postid,
      user,
      text,
    });

    await newComment.save();

    post.comments.push(newComment._id);
    await post.save();
    res.status(200).json({
      message: "New comment created successfully",
      newComment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const getPostComments = async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    return res.status(404).json({
      message: "No Id In The URL",
    });
  }
  try {
    const postcomments = await Comment.find({ postId });
    if (!postcomments) {
      return res.status(404).json({
        message: "No comments found for this post",
      });
    }
    res.status(200).json({
      success: true,
      comments: postcomments,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
      data: postcomments,
    });
  }
};
export const deleteComment = async (res, req) => {
  const { id } = req.id;
  if (!id) {
    return res.status(400).json({
      message: " id is required",
    });
  }
  try {
    const comment = await Comment.findByIdAndDelete({ id });
    if (!comment) {
      return res.status(404).json({
        message: "No comment found",
      });
    }
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment._id },
    });
    res.status(200).json({
      message: "Post has been deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err,
    });
  }
};
