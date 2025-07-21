import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here you would typically send the form data to your server

    setSubmitted(true);
    toast.success("Message sent successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
      <p className="mb-6 text-gray-600">
        Have questions or need help? Fill out the form below and our team will
        get back to you soon.
      </p>
      {submitted ? (
        <div className="text-green-600 my-5">
          Thank you for contacting us! We will respond as soon as possible.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-1 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      )}
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
        <p className="text-gray-700">Email: support@ecommerce.com</p>
        <p className="text-gray-700">Phone: +1 234 567 890</p>
        <p className="text-gray-700">Address: 123 Commerce St, City, Country</p>
      </div>
    </div>
  );
};

export default Contact;
