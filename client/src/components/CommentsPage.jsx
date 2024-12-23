import { useEffect, useState } from "react";

function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await api.get("/comments");
        setComments(response.data.comments || []);
      } catch (error) {
        console.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, []);
  if (loading) {
    return <p>Loading....</p>;
  }
  if (comments.length === 0) {
    return <p>No Comments Avaliable</p>;
  }
  return (
    <>
      <div className="p-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="border p-3 rounded-md shadow-sm">
            <h3 className="font-medium text-lg">{comment.user}</h3>
            <p className="text-gray-700">{comment.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default CommentsPage;
