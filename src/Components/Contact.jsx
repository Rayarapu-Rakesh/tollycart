import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted!");
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[url('https://img.freepik.com/premium-photo/shopping-bags-like-pastel-background-online-store-concept_226769-249.jpg')] bg-center bg-cover py-10 px-4">
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-lg shadow-md rounded-xl mt-10 p-6 md:p-10">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-xl"
            >
              Send Message
            </button>
          </form>

          <div className="text-gray-700 space-y-4">
            <h3 className="text-xl font-semibold">Get in Touch</h3>
            <p><strong>Email:</strong> support@tollycart.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> 123 Fashion Street, Hyderabad, India</p>
            <iframe
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2593732221464!2d78.48668131435367!3d17.38504468805625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb977d1b43efaf%3A0xa91f6a95c7c5cb2e!2sCharminar!5e0!3m2!1sen!2sin!4v1673538925629"
              width="100%"
              height="200"
              allowFullScreen=""
              loading="lazy"
              className="rounded border"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
