
import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";
import Cards from "./Cards";

function Freebook() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:5000/book");

        const data = res.data.filter(
          (item) => item.category === "Free"
        );

        console.log("Free Books:", data);
        setBook(data);
      } catch (error) {
        console.error(
          "Error fetching free books:",
          error.response?.data || error.message
        );
      }
    };

    getBook();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">

      <div>
        <h1 className="font-semibold text-xl pb-2">
          Free Books for You
        </h1>

        <p className="text-gray-600">
          Explore our collection of free books and discover
          valuable learning resources. Whether you want to
          gain knowledge, develop new skills, or explore
          interesting topics, find books that match your interests.
        </p>
      </div>

      <div className="mt-6">
        {book.length > 0 ? (
          <Slider {...settings}>
            {book.map((item) => (
              <Cards item={item} key={item._id} />
            ))}
          </Slider>
        ) : (
          <p className="text-center mt-8">
            No free books available at the moment.
          </p>
        )}
      </div>

    </div>
  );
}

export default Freebook;
