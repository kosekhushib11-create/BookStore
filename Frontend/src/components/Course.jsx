
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:5000/book");

        console.log("Books Data:", res.data);
        setBook(res.data);
      } catch (error) {
        console.error(
          "Error fetching books:",
          error.response?.data || error.message
        );
      }
    };

    getBook();
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here! :)</span>
          </h1>

         <p className="mt-12">
  Explore our collection of books and discover something new to read.
  Whether you're looking to learn new skills, improve your knowledge,
  or enjoy an interesting story, we have books for different interests
  and learning needs. Browse our collection, find your favourite books,
  and make learning an enjoyable experience. Start exploring today!
</p>

          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {book.length > 0 ? (
            book.map((item) => (
              <Cards key={item._id} item={item} />
            ))
          ) : (
            <p className="col-span-full text-center">
              No books available.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Course;
