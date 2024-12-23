import { useState } from "react";
import api from "../service/api";
import { Layout } from "./Layout";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = api.post("");
      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error(error);
      setResponseMessage("Error submitting the form");
    }
  };

  return (
    <Layout>
      <section className="py-16 px-4">
        <h2 className="text-3xl text-center mb-8">Contact Us</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="w-full p-3 border rounded"
            rows="4"
          ></textarea>
          <button type="submit" className="w-full btn py-3">
            Submit
          </button>
        </form>
        {responseMessage && (
          <p className="text-center mt-4">{responseMessage}</p>
        )}
      </section>
    </Layout>
  );
}

export default Contact;
