import { useParams } from "react-router-dom";
import { usePost } from "../context/PostContext";
import Comment from "./Comment";
import PostComment from "./PostComment";
import { Layout } from "./Layout";
import { useEffect, useState } from "react";
import api from "../service/api";
import { errorMessage } from "../utils/toastNotifications";

function PostDetails() {
  const { id } = useParams();
  const { postData } = usePost();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const post = postData?.find((post) => post._id === id);

  useEffect(() => {
    const fectData = async () => {
      try {
        const response = await api.get(`/comments/${id}/comment`);
        setComments(response.data.comments);
      } catch (error) {
        console.error(error);
        errorMessage(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fectData();
  }, [id]);
  console.log(comments);
  if (!post) {
    return (
      <Layout>
        <p className="text-gray-500">Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-4">{post.description}</p>
        {post.image && (
          <img
            src={`http://localhost:5000/${post.image}`}
            alt={post.title}
            className="rounded-lg w-full max-h-96 object-cover mb-6"
          />
        )}
      </div>

      <div className="bg-[#fff5f7] rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>

        <PostComment postId={post._id} />
        {loading ? (
          <p className="text-gray-500 text-center mt-4">Loading comments...</p>
        ) : comments.length > 0 ? (
          <div className="grid grid-cols-3 mt-3 gap-1">
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">No comments yet.</p>
        )}
      </div>
    </Layout>
  );
}

export default PostDetails;
