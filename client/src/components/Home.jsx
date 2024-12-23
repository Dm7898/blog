// import Comment from "./Comment";
import { Layout } from "./Layout";
import Posts from "./Posts";
import banner from "../../public/2151043488.jpg";

function Home() {
  return (
    <Layout>
      {/* Banner Section */}
      <section className=" text-white py-8 flex lg:flex-row flex-col items-center justify-between">
        {/* Left Side Image */}
        <div className="lg:w-1/2 w-full">
          <img src={banner} alt="Banner" className="w-full h-auto rounded-lg" />
        </div>

        {/* Right Side Content */}
        <div className="lg:w-1/2 w-full text-left px-4">
          <h1 className="text-4xl font-semibold mb-4">
            Welcome to Our Website
          </h1>
          <p className="text-xl mb-6">
            Stay updated with the latest posts and news
          </p>
          <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-md">
            Get Started
          </button>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Latest Blogs
          </h2>
          <Posts />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">What Our Users Say</h2>
          {/* <Comment /> */}
        </div>
      </section>
    </Layout>
  );
}

export default Home;
