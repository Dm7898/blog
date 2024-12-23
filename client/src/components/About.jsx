import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Layout } from "./Layout";
import image from "../../public/aifarming.png";

function About() {
  return (
    <Layout>
      <section className="bg-transparent py-16 px-4 text-center">
        {/* Name and Designation */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">John Doe</h2>
        <p className="text-xl text-gray-600 mb-8">Web Developer</p>

        {/* Image */}
        <img
          src={image}
          alt="John Doe"
          className="w-32 h-32 rounded-full mx-auto mb-8"
        />

        {/* Description */}
        <p className="text-lg text-gray-700 mb-8">
          I am a passionate web developer always eager to learn and create
          seamless user experiences.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6">
          <a
            href="https://facebook.com"
            className="text-blue-600 hover:text-blue-800"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://twitter.com"
            className="text-blue-400 hover:text-blue-600"
          >
            <FaTwitter size={30} />
          </a>
          <a
            href="https://instagram.com"
            className="text-pink-600 hover:text-pink-800"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://linkedin.com"
            className="text-blue-700 hover:text-blue-900"
          >
            <FaLinkedin size={30} />
          </a>
        </div>
      </section>
    </Layout>
  );
}

export default About;
