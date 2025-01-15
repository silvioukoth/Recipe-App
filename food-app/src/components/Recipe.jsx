import React, { useState } from 'react';
import RecipeDetails from './RecipeDetails';

const Recipe = ({ recipe }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { label, image, url, ingredients } = recipe.recipe;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={image} alt={label} />
      <div className="p-6"> 
        <h2 className="text-xl font-bold mb-2">{label}</h2>
        <p className="text-gray-700 text-base">
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            View Full Recipe
          </a>
        </p>
        <button 
          onClick={() => setShowDetails(!showDetails)} 
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showDetails ? 'Hide Ingredients' : 'Show Ingredients'}
        </button>
        <div 
          className={`transition-max-height duration-300 ease-in-out overflow-hidden 
                     ${showDetails ? 'max-h-48' : 'max-h-0'}`} 
        > 
          <RecipeDetails ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
};

export default Recipe;