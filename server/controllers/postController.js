import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.path : null;
  console.log(req.file);
  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }
  try {
    const newPost = new Post({
      title,
      description,
      image,
    });
    await newPost.save();
    res.status(201).json({
      message: "New post has been created",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const image = req.file ? req.file.path : null;
  // console.log(req.file);
  try {
    const updatePost = await Post.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    );
    if (!updatePost) {
      return res.status(404).json({
        message: "Post is not found",
      });
    }
    res.status(201).json({
      message: "Post Updated Successfully",
      data: updatePost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteId = await Post.findByIdAndDelete(id);
    if (!deleteId) {
      res.status(404).json({
        message: "Post id not found",
      });
    }
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};
