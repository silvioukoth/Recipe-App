import { useState } from 'react';
import { supabase } from '../api/supabaseClient';


const RecipeForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('recioes').insert({ title, description });
        if(error) console.log.error('Error adding recipe:', error);
        else console.log('Recipe added successfully!');
    }
  return (
    <div>
      <form onSubmit={handleSubmit} className="border p-4">

        <input 
        type="text"
        placeholder='Recipe Title'
        value={title}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2"
        />
        <textarea 
        placeholder='Description'
        value={description}       
        className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Add Recipe
        </button>
      </form>
    </div>
  )
}

export default RecipeForm
