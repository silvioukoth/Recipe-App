import React, { useState } from "react";
import RecipeDetails from "./RecipeDetails";

const Recipe = ({ recipe }) => {
  const [show, setShow] = useState(false);
  const { label, image, url, ingredients } = recipe.recipe;

  return (
    <div className="recipe bg-gray-300 rounded-lg shadow-lg flex flex-col justify-between overflow-hidden transition-transform transform hover:scale-105">
      {/* Image and Title */}
      <div className="relative">
        <img
          src={image}
          alt={label}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <h2 className="absolute top-0 left-0 right-0 bg-gray-700 bg-opacity-75 text-white text-xl font-semibold text-center p-2">
          {label}
        </h2>
      </div>

      {/* Content */}
      <div className="p-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-500 text-center font-medium mb-4"
        >
          View Recipe!
        </a>
        <button
          onClick={() => setShow(!show)}
          className="bg-[#307edc] text-white text-lg uppercase py-2 px-4 rounded-md w-full"
        >
          Ingredients
        </button>
        {show && <RecipeDetails ingredients={ingredients} />}
      </div>
    </div>
  );
};

export default Recipe;
