import { useEffect, useState } from "react";
import api from "../service/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorMessage, successMessage } from "../utils/toastNotifications";

function PostComment({ postId }) {
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const saveduser = localStorage.getItem("role");
    if (saveduser) {
      setUser(saveduser);
    }
  }, [user]);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) {
      errorMessage("Comment message cannot be empty!");
      return;
    }
    try {
      await api.post(`/comments/${postId}/comment`, {
        postId,
        user,
        text,
      });
      setText("");
      successMessage("Comment has been posted successfully!");
    } catch (error) {
      errorMessage("Error from server side");
      errorMessage(error.response?.data?.message || "Server error");
    }
  }
  return (
    <>
      <ToastContainer />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-4 space-y-3"
      >
        <h3 className="text-lg font-semibold text-gray-800">Leave a Comment</h3>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full h-24 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end space-x-3">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Post
          </button>
          <button
            type="button"
            onClick={() => setText("")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
}

export default PostComment;
