import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PostFrom from "./components/PostFrom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import EditPostForm from "./components/EditPostForm";
import { PostProvider } from "./context/PostContext";
import PostDetails from "./components/PostDetails";
import Postspage from "./components/Postspage";
import About from "./components/About";
import Contact from "./components/Contact";
function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/post-form" element={<PostFrom />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route
                path="/edit-postform/:id"
                element={
                  <ProtectedRoute>
                    <EditPostForm />
                  </ProtectedRoute>
                }
              />
              <Route path="/blogs" element={<Postspage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </div>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
