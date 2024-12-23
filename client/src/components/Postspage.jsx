import { Link } from "react-router-dom";
import Posts from "./Posts";
import { Layout } from "./Layout";
function Postspage() {
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl mt-5 mb-3">Posts</h2>
        <Link
          className="bg-blue-600 hover:bg-blue-500 transition-all text-white px-2 py-1 rounded"
          to="/post-form"
        >
          Add New Post
        </Link>
      </div>

      <Posts />
    </Layout>
  );
}

export default Postspage;
