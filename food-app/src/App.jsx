import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import supabase from "./supabaseClient";
import Navbar from "./Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";
import Axios from "axios";
import image from './assets/image1.jpg';

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign-Up and Login

  const APP_ID = "b09f15ec";
  const APP_KEY = "362474b6ae5bd7a4544929f232892631";
  const BASE_URL = "https://api.edamam.com/search";
  const url = `${BASE_URL}?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  // Fetch data from API
  const getData = async () => {
    if (query !== "") {
      try {
        const result = await Axios.get(url);
        if (!result.data.more) {
          return setAlert("No food with such name");
        }

        localStorage.setItem("recipes", JSON.stringify(result.data.hits));
        setRecipes(result.data.hits.map((hit) => ({ ...hit, id: hit.recipe.uri })));
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

  // Check authentication on load
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
      <div className="App flex flex-col items-center overflow-x-hidden overflow-y-auto min-h-screen bg-cover bg-center brightness-100"
        style={{ backgroundImage: `url(${image})` }}
      >
        <Navbar setAuthenticated={setAuthenticated} />
        <Routes>
          <Route
            path="/"
            element={
              !authenticated ? (
                <div className="flex flex-col gap-10 mt-20">
                  <div className="w-[80%] max-w-[500px] mx-auto">
                    {isSignUp ? (
                      <SignUp setAuthenticated={setAuthenticated} />
                    ) : (
                      <Login setAuthenticated={setAuthenticated} />
                    )}
                  </div>
                  <div className="w-[80%] max-w-[500px] mx-auto mt-5">
                    <button
                      className="text-blue-500"
                      onClick={() => setIsSignUp(!isSignUp)}
                    >
                      {isSignUp
                        ? "Already have an account? Login"
                        : "Don't have an account? Sign Up"}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-light italic text-[#e04433] mt-16 mb-8 text-shadow-lg">
                    Food<span className="text-lg font-bold text-white">Application!</span>
                  </h1>
                  <form
                    onSubmit={onSubmit}
                    className="relative flex justify-center items-center bg-gray-300 rounded-lg w-[60rem] h-[10rem] mb-20 shadow-2xl"
                  >
                    {alert && <Alert alert={alert} />}
                    <input
                      type="text"
                      name="query"
                      onChange={onChange}
                      value={query}
                      autoComplete="off"
                      placeholder="Search Food"
                      className="w-[60%] h-[3rem] px-2 text-gray-600 border-b border-gray-300 text-xl rounded-md"
                    />
                    <input
                      type="submit"
                      value="Search"
                      className="w-[25%] h-[3rem] bg-[#40b48e] text-white uppercase text-xl rounded-md"
                    />
                  </form>
                  <div className="recipes grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-[90%]">
                    {recipes.length > 0 &&
                      recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)}
                  </div>
                </>
              )
            }
          />

          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />

          <Route path="/signup" element={<SignUp setAuthenticated={setAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
