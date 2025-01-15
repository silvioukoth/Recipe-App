import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import supabase from "./supabaseClient";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";
import Axios from "axios";
//import image from "./assets/image1.jpg";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const APP_ID = "b09f15ec";
  const APP_KEY = "362474b6ae5bd7a4544929f232892631";
  const BASE_URL = "https://api.edamam.com/search";
  const url = `${BASE_URL}?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      try {
        const result = await Axios.get(url);
        if (!result.data.more) {
          return setAlert("No food with such name");
        }

        localStorage.setItem("recipes", JSON.stringify(result.data.hits));
        setRecipes(
          result.data.hits.map((hit) => ({ ...hit, id: hit.recipe.uri }))
        );
        setQuery("");
        setAlert("");
      } catch (error) {
        setAlert("An error occurred while fetching data. Please try again.");
        console.error(error);
      }
    } else {
      setAlert("Please fill the form");
    }
  };

  const onChange = (e) => setQuery(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }

    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  return (
    <Router>
      <div 
        className="App flex flex-col min-h-screen bg-gray-100" 
      >
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white shadow-md flex justify-between items-center p-4"> 
          <h1 className="text-xl text-red-500"><span className="text-blue-500">Food-</span>Bank</h1> 
          <form onSubmit={onSubmit} className="flex"> 
            <input
              type="text"
              name="query"
              value={query} 
              onChange={onChange} 
              autoComplete="off"
              placeholder="Search Food"
              className="w-full sm:w-64 h-[3rem] px-2 mb-2 sm:mb-0 sm:mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black" // Added text-black here
            />
            <button
              type="submit"
              className="w-full sm:w-24 h-[3rem] bg-blue-500 text-white hover:bg-blue-600 rounded-md cursor-pointer" 
            >
              Search
            </button>
          </form>
          {authenticated && (
            <button
              onClick={() => {
                supabase.auth.signOut();
                setAuthenticated(false); 
              }}
              className="bg-blue-500 hover:bg-red-500 text-white-500 font-bold py-2 px-4 rounded" 
            >
              Logout
            </button>
          )}
        </nav>

        <div className="container mx-auto mt-20"> {/* Adjust top margin to account for navbar height */} 
          <Routes>
            <Route
              path="/"
              element={
                !authenticated ? (
                  <div className="flex flex-col gap-6 items-center">
                    <div className="w-[80%] max-w-[500px]">
                      {isSignUp ? (
                        <SignUp setAuthenticated={setAuthenticated} />
                      ) : (
                        <Login setAuthenticated={setAuthenticated} />
                      )}
                    </div>
                    <button
                      className="text-blue-500"
                      onClick={() => setIsSignUp(!isSignUp)}
                    >
                      {isSignUp
                        ? "Already have an account? Login"
                        : "Don't have an account? Sign Up"}
                    </button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-center mb-4 mt-5">
                     Your Food Bank!
                    </h1> 

                    <div className="recipes grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-[90%] max-w-[60rem] mx-auto">
                      {recipes.length > 0 &&
                        recipes.map((recipe) => (
                          <Recipe key={recipe.id} recipe={recipe} /> 
                        ))}
                    </div>
                  </>
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;