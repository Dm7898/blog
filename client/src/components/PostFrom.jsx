import { useState, useRef } from "react";
import api from "../service/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successMessage, errorMessage } from "../utils/toastNotifications";
import { useNavigate } from "react-router-dom";
import { usePost } from "../context/PostContext";
function PostFrom() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const { addPost } = usePost();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  function handleChange(e) {
    const file = e.target.files[0];
    console.log(file.type);
    if (file) {
      const allowedTypes = [
        "image/jpg",
        "image/webp",
        "image/png",
        "image/jpeg",
      ];
      if (allowedTypes.includes(file.type)) {
        setImage(file);
      } else {
        setImage(null);
        errorMessage("Only jpg,webp,png formats are allowed");
      }
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    try {
      const response = await api.post("/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      addPost(response.data.data);
      console.log(response.data.data);
      setTitle("");
      setDescription("");
      setImage(null);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      successMessage("New Post has been created");
      navigate(-1);
      console.log("New Blog Has Been Created");
    } catch (error) {
      setTitle("");
      setDescription("");
      errorMessage("Error While Creating A Blog Please check console");
      console.error(error);
    }
  }
  return (
    <>
      <ToastContainer />
      <h2 className="text-2xl mb-3">Post From</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col space-y-2 shadow-md p-3 rounded w-1/3"
      >
        <label>Title</label>
        <input
          className="border p-2 border-gray-400 rounded"
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
        <label>Content</label>
        <textarea
          className="border p-2 border-gray-400 rounded"
          type="text"
          name="description"
          value={description}
          placeholder="Write something here"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
        />
        <label>Image</label>
        <input type="file" name="image" ref={fileRef} onChange={handleChange} />
        <button type="submit" className="bg-blue-700 text-white rounded py-1">
          Submit
        </button>
      </form>
    </>
  );
}

export default PostFrom;
