import { Link } from "react-router-dom";

function Post({ post }) {
  return (
    <div className="w-full bg-[#fff5f7] flex flex-col justify-between border border-gray-300 p-4 shadow-lg rounded-3xl h-auto transition-transform transform hover:scale-105">
      {post.image && (
        <img
          src={`http://localhost:5000/${post.image}`}
          alt={post.title}
          className="w-full h-48 object-cover rounded-2xl shadow-sm mb-4"
        />
      )}
      <h2 className="text-lg font-semibold text-gray-800">
        <Link to={`/post/${post._id}`}>{post.title}</Link>
      </h2>
      <p className="font-extralight line-clamp-2">{post.description}</p>
      <button className="btn mt-2">Read more</button>
    </div>
  );
}

export default Post;
