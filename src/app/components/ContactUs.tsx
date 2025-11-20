"use client";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Try again later.");
      }
    } catch {
      setStatus("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <section className="page-section max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">Contact Us</h2>
      <p className="text-gray-600 text-center mb-10">
        Have a question or project in mind? Fill out the form below or email us directly at{" "}
        <a href="mailto:info@morextech.com" className="text-blue-600 hover:underline">
          info@morextech.com
        </a>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md space-y-4 sm:space-y-5"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>

      {status && <p className="text-center mt-4 text-gray-700">{status}</p>}
    </section>
  );
}
