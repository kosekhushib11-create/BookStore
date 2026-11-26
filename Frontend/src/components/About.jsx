
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function About() {
  return (
  <>
  <Navbar/>
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-28 mb-16">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            About <span className="text-pink-500">BookStore</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Discover, Learn and Grow Through Reading.
          </p>
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Welcome to Our BookStore!
            </h2>

            <p className="text-gray-600 leading-7 mb-4">
              BookStore is an online platform designed to make
              discovering and exploring books simple and convenient.
              We bring together a collection of books covering
              different subjects, interests, and learning needs.
            </p>

            <p className="text-gray-600 leading-7 mb-4">
              Our goal is to encourage reading and make knowledge
              accessible to everyone. Whether you are a student,
              a professional, or someone who enjoys reading,
              you can explore books that match your interests.
            </p>

            <p className="text-gray-600 leading-7">
              Browse our collection, discover new topics, and
              make reading a part of your everyday life.
              We believe every book offers an opportunity
              to learn something new.
            </p>

            <Link to="/course">
              <button className="mt-6 bg-pink-500 text-white px-5 py-2 rounded-md hover:bg-pink-700 duration-300">
                Explore Books
              </button>
            </Link>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800"
              alt="Books in a library"
              className="rounded-xl shadow-lg w-full max-w-lg h-80 object-cover"
            />
          </div>

        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">

          <div className="border rounded-xl p-6 shadow-sm hover:shadow-md duration-300">
            <h2 className="text-xl font-bold text-pink-500 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-7">
              To provide a convenient platform where readers can
              discover books, explore knowledge, and develop
              a habit of continuous learning.
            </p>
          </div>

          <div className="border rounded-xl p-6 shadow-sm hover:shadow-md duration-300">
            <h2 className="text-xl font-bold text-pink-500 mb-3">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-7">
              To create an accessible and engaging reading
              experience that inspires people to learn,
              grow, and explore new ideas through books.
            </p>
          </div>

        </div>

      </div>
    </div>
    </>
  );
}

export default About;
