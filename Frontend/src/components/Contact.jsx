
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Contact() {
  return (
    <>
    <Navbar/>
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-28 mb-16">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Contact <span className="text-pink-500">Us</span>
          </h1>

          <p className="mt-4 text-gray-600">
            We'd love to hear from you. Get in touch with us!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Information */}
          <div className="space-y-6">

            <h2 className="text-2xl font-semibold">
              Get in Touch
            </h2>

            <p className="text-gray-600 leading-7">
              Have questions, suggestions, or feedback about our
              BookStore? We are always happy to hear from our
              readers. Contact us and let us know how we can help.
            </p>

            <div className="border rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold text-lg text-pink-500">
                Email
              </h3>
              <p className="text-gray-600 mt-2">
                support@bookstore.com
              </p>
            </div>

            <div className="border rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold text-lg text-pink-500">
                Our Services
              </h3>
              <p className="text-gray-600 mt-2">
                Book Discovery, Reading Resources and Customer Support.
              </p>
            </div>

            <div className="border rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold text-lg text-pink-500">
                Support
              </h3>
              <p className="text-gray-600 mt-2">
                Feel free to contact us for any questions or
                assistance related to our platform.
              </p>
            </div>

          </div>

          {/* Contact Form */}
          <div className="border rounded-xl p-6 shadow-md">

            <h2 className="text-2xl font-semibold mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-5">

              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-2 border rounded-md outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 border rounded-md outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  required
                  className="w-full px-4 py-2 border rounded-md outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  required
                  className="w-full px-4 py-2 border rounded-md outline-none focus:border-pink-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-700 duration-300 w-full"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default Contact;
