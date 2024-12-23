import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/image.png";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full z-50 bg-transparent">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold ">
          <img className="w-24 rounded" src={logo} alt="logo" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {["Home", "About", "Blogs", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className=" hover:text-gray-300 transition"
            >
              {item}
            </Link>
          ))}
          <button className="bg-blue-600 hover:bg-blue-500  px-4 py-2 rounded">
            Subscribe
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className=" md:hidden"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Links */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-70">
          <div className="flex flex-col items-center space-y-4 py-4">
            {["Home", "About", "Blogs", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className=" hover:text-gray-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <button className="bg-blue-600 hover:bg-blue-500  px-4 py-2 rounded">
              Subscribe
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
