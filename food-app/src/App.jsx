import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";
import Axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

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
        setRecipes(result.data.hits.map(hit => ({ ...hit, id: hit.recipe.uri })));
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

  return (
    <Router>
      <div className="App flex flex-col items-center">
        <Routes>
          {/* Route for the Home Page (Main App) */}
          <Route
            path="/"
            element={
              !authenticated ? (
                <div className="flex space-x-4">
                  <SignUp setAuthenticated={setAuthenticated} />
                  <Login setAuthenticated={setAuthenticated} />
                </div>
              ) : (
                <>
                  <h1 className="text-8xl font-light italic text-[#40b48e] mt-16 mb-8 text-shadow-lg">
                    Food Searching App
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
                  <div className="recipes flex flex-wrap justify-center items-start w-[90%]">
                    {recipes.length > 0 &&
                      recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)}
                  </div>
                </>
              )
            }
          />

          {/* Route for the Login Page */}
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated} />}
          />

          {/* Route for the SignUp Page */}
          <Route
            path="/signup"
            element={<SignUp setAuthenticated={setAuthenticated} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
