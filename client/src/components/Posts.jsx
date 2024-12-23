import Post from "./Post";

import { usePost } from "../context/PostContext";

function Posts() {
  const { postData } = usePost();

  return (
    <>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        {postData?.length > 0 ? (
          postData.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p className="text-gray-500 text-center w-full">Loading...</p>
        )}
      </div>
    </>
  );
}

export default Posts;
