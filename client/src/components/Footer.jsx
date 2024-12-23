import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#ff003c] py-8 mt-8 text-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <Link to="/" className="text-3xl font-bold text-blue-600">
            MyLogo
          </Link>
          <p className="mt-4 text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link to="#" className="text-blue-600">
              Facebook
            </Link>
            <Link to="#" className="text-blue-600">
              Twitter
            </Link>
            <Link to="#" className="text-blue-600">
              Instagram
            </Link>
          </div>
        </div>

        {/* Page Links */}
        <div>
          <h3 className="text-xl font-semibold">Pages</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/" className="text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="text-gray-300">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Email Subscription */}
        <div>
          <h3 className="text-xl font-semibold">Subscribe</h3>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 w-full bg-gray-800 text-white rounded-md"
            />
            <button
              type="submit"
              className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
