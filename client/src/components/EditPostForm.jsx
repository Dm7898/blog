import api from "../service/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorMessage, successMessage } from "../utils/toastNotifications";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../context/PostContext";

function EditPostForm() {
  const { id } = useParams();
  const { postData, setPostData } = usePost();
  const post = postData.find((post) => post._id === id);
  const [formState, setFromState] = useState({
    title: post?.title || "",
    description: post?.description || "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(post?.image || null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!post) {
      errorMessage("no post found");
      navigate(-1);
    }
  }, [post, navigate]);
  function handleInput(e) {
    const { name, value } = e.target;
    setFromState((prev) => ({ ...prev, [name]: value }));
  }
  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      setFromState((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    const { title, description, image } = formState;

    if (title === post.title && description === post.description && !image) {
      errorMessage("No changes made");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    } else if (previewImage) {
      formData.append("image", previewImage);
    }
    try {
      await api.patch(`/posts/${post._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedPosts = await api.get("/posts");
      setPostData(updatedPosts.data);
      successMessage("Post Updated Successfully");
      navigate(-1);
    } catch (error) {
      errorMessage(
        error.response?.data?.message || "Something worng from the server side"
      );
      console.error(error);
    }
  }
  function handleClick(e) {
    e.preventDefault();
    navigate(-1);
  }
  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleEditSubmit}
        className="bg-white flex flex-col space-y-2 shadow-md p-3 rounded w-2/5"
      >
        <label>Title</label>
        <input
          className="border p-2 border-gray-400 rounded"
          type="text"
          name="title"
          value={formState.title}
          placeholder="Title"
          onChange={handleInput}
          required
        />
        <label>Content</label>
        <textarea
          className="border p-2 border-gray-400 rounded"
          name="description"
          rows={6}
          value={formState.description}
          placeholder="Write something here"
          onChange={handleInput}
          required
        />
        <label>Image</label>
        <div className="flex gap-1 items-center">
          {previewImage && (
            <img
              className="w-16 rounded-full"
              src={
                previewImage.startsWith("blob")
                  ? previewImage
                  : `http://localhost:5000/${previewImage}`
              }
            />
          )}
          <input type="file" name="image" onChange={handleImage} />
        </div>
        <div className="flex space-x-1">
          <button
            type="submit"
            className="bg-blue-700 text-white rounded py-1 px-2"
          >
            Submit
          </button>
          <button
            onClick={handleClick}
            className="bg-slate-500 text-white rounded py-1 px-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default EditPostForm;
