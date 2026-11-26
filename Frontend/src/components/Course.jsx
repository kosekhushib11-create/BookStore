
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cards from "./Cards";

function Course() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const apiUrl = (
          import.meta.env.VITE_API_URL ||
          "https://bookstore-u7zc.onrender.com"
        ).replace(/\/$/, "");

        const res = await axios.get(`${apiUrl}/book`, {
          signal: controller.signal,
        });

        if (!Array.isArray(res.data)) {
          throw new Error("Invalid books response from server");
        }

        console.log("All Books:", res.data);
        setBooks(res.data);

      } catch (err) {
        if (
          err.name === "CanceledError" ||
          axios.isCancel(err)
        ) return;

        console.error("Course Books Error:", err);

        setError(
          err.response?.data?.message ||
          err.message ||
          "Unable to load books."
        );

      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    getBooks();

    return () => controller.abort();
  }, []);

  return (
    <main className="max-w-screen-2xl container mx-auto px-4 md:px-20">

      <div className="mt-28 text-center">
        <h1 className="text-2xl md:text-4xl">
          We're delighted to have you{" "}
          <span className="text-pink-500">Here! :)</span>
        </h1>

        <p className="mt-12">
          Explore our collection of books and discover something new to read.
          Whether you're looking to learn new skills, improve your
          knowledge, or enjoy an interesting story, we have books for different
          interests and learning needs. Browse our collection, find your
          favourite books, and make learning an enjoyable experience.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-pink-500 px-4 py-2 text-white duration-300 hover:bg-pink-700"
        >
          Back
        </Link>
      </div>

      {loading ? (
        <p className="mt-12 text-center">
          Loading books...
        </p>
      ) : error ? (
        <p className="mt-12 text-center text-red-500">
          {error}
        </p>
      ) : books.length === 0 ? (
        <p className="mt-12 text-center">
          No books available.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4">
          {books.map((book) => (
            <Cards key={book._id} item={book} />
          ))}
        </div>
      )}

    </main>
  );
}

export default Course;
