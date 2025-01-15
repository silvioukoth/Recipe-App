import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const RecipeDetails = ({ ingredients }) => {
  return (
    <div className="max-h-60 overflow-y-auto"> 
      <ul className="space-y-2">
        {ingredients.map((ingredient) => (
          <li key={uuidv4()} className="flex justify-between">
            <span>{ingredient.text}</span>
            <span className="text-sm text-gray-500">Weight - {ingredient.weight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetails;