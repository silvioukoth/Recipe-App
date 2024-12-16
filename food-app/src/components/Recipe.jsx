import React, { useState } from "react";
import RecipeDetails from "./RecipeDetails";

const Recipe = ({ recipe }) => {
  const [show, setShow] = useState(false);
  const { label, image, url, ingredients } = recipe.recipe;

  return (
    <div className="recipe w-[30rem] m-12 bg-gray-300 p-8 relative rounded-md shadow-2xl">
      <h2 className="absolute top-[2.5rem] left-[2.5rem] right-[2.5rem] bg-gray-600 bg-opacity-70 text-white text-3xl font-light rounded-md py-1 px-2 text-center">{label}</h2>
      <img src={image} alt={label} className="rounded-md object-cover w-full h-[200px]"/>
      <a href={url} target="_blank" rel="noopener noreferrer">
        view recipe!
      </a>
      <button onClick={() => setShow(!show)} className="bg-[#40b48e] text-white text-2xl uppercase py-2 px-4 rounded-md mt-4 w-full">Ingredients</button>
      {show && <RecipeDetails ingredients={ingredients} />}
    </div>
  );
};

export default Recipe;