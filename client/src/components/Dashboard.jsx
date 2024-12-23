import { Link } from "react-router-dom";
import { usePost } from "../context/PostContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
function Dashboard() {
  const { postData, deletePost } = usePost();
  const { logout } = useAuth();
  return (
    <>
      <ToastContainer />
      <button
        className="bg-blue-500 rounded-sm px-2 py-1 text-white"
        onClick={logout}
      >
        Logout
      </button>
      <div className="flex justify-between space-y-3 items-center mb-3">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <Link
          className="bg-blue-600 hover:bg-blue-500 transition-all text-white px-2 py-1 rounded"
          to="/post-form"
        >
          Add New Post
        </Link>
      </div>
      <table className="bg-white w-full border border-gray-300 rounded-md shadow-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border border-gray-300 text-left text-sm font-semibold text-gray-600">
              ID
            </th>
            <th className="p-3 border border-gray-300 text-left text-sm font-semibold text-gray-600">
              Title
            </th>
            <th className="p-3 border border-gray-300 text-left text-sm font-semibold text-gray-600">
              Image
            </th>
            <th className="p-3 border border-gray-300 text-left text-sm font-semibold text-gray-600">
              Created At
            </th>
            <th className="p-3 border border-gray-300 text-left text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {postData.length > 0 ? (
            postData.map((data) => (
              <tr
                key={data._id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-2 border border-gray-300 text-sm text-gray-700">
                  {data._id}
                </td>
                <td className="p-2 border border-gray-300 text-sm text-gray-700">
                  {data.title}
                </td>
                <td className="p-2 border border-gray-300 text-sm text-gray-700">
                  <img
                    src={`http://localhost:5000/${data.image}`}
                    alt={data.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="p-2 border border-gray-300 text-sm text-gray-700">
                  {new Date(data.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border border-gray-300">
                  <div className="flex space-x-2">
                    <Link
                      to={`/edit-postform/${data._id}`}
                      className="bg-blue-500 hover:bg-blue-400 text-white rounded-md px-3 py-1 text-sm transition-all"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePost(data._id)}
                      className="bg-red-500 hover:bg-red-400 text-white rounded-md px-3 py-1 text-sm transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center p-5 text-gray-500 font-medium text-sm"
              >
                No posts available. Please add a new post.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Dashboard;
