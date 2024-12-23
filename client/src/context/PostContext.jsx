import { createContext, useContext, useEffect, useState } from "react";
import api from "../service/api";
import { errorMessage, successMessage } from "../utils/toastNotifications";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    const fectData = async () => {
      try {
        const response = await api.get("/posts");
        setPostData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fectData();
  }, []);

  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      successMessage("Post has been deleted");
      setPostData((prevdata) => prevdata.filter((post) => post._id !== id));
    } catch (err) {
      errorMessage("Server error");
      console.error(err);
    }
  };
  const addPost = (newPost) => {
    setPostData((prevdata) => [...prevdata, newPost]);
  };
  return (
    <PostContext.Provider
      value={{ postData, deletePost, setPostData, addPost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
