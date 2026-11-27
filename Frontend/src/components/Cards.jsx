
import React, { useState } from "react";

function Cards({ item }) {
  const [imageError, setImageError] = useState(false);

  const handleBuyNow = () => {
    document.getElementById("my_modal_3")?.showModal();
  };

  const fallbackImage =
    "https://placehold.co/400x600/e2e8f0/334155?text=Book+Cover";

  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-full bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">

        <figure className="h-64 overflow-hidden bg-gray-100">
          <img
            src={
              !imageError && item.image
                ? item.image
                : fallbackImage
            }
            alt={item.name || "Book"}
            className="h-full w-full object-contain"
            onError={() => setImageError(true)}
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title flex-wrap">
            {item.name}

            <div className="badge badge-secondary">
              {item.category}
            </div>
          </h2>

          <p>{item.title}</p>

          <div className="card-actions justify-between">
            <div className="badge badge-outline">
              ${item.price}
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
            >
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cards;
