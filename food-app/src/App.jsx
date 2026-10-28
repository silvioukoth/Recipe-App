
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import supabase from "./supabaseClient";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Recipe from "./components/Recipe";
import Axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);

  // Edamam Recipe Search API v2 credentials
const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;

  const BASE_URL = "https://api.edamam.com/api/recipes/v2";

  // Search for recipes
  const getData = async (searchTerm) => {
    const food = searchTerm.trim();

    if (!food) {
      setAlert("Please enter a food name.");
      return;
    }

    if (!APP_ID || !APP_KEY) {
      setAlert(
        "Edamam API credentials are missing. Check your .env file."
      );
      return;
    }

    setLoading(true);
    setAlert("");

    try {
      const result = await Axios.get(BASE_URL, {
        params: {
          type: "public",
          q: food,
          app_id: APP_ID,
          app_key: APP_KEY,
        },
      });

      const hits = result.data.hits || [];

      if (hits.length === 0) {
        setRecipes([]);
        localStorage.removeItem("recipes");
        setAlert("No recipes found. Try another food name.");
        return;
      }

      const formattedRecipes = hits.map((hit) => ({
        ...hit,
        id: hit.recipe.uri,
      }));

      setRecipes(formattedRecipes);

      localStorage.setItem(
        "recipes",
        JSON.stringify(formattedRecipes)
      );

      setQuery("");
      setAlert("");
    } catch (error) {
      console.error(
        "Edamam API error:",
        error.response?.status,
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        setAlert(
          "API authentication failed. Check your Edamam credentials."
        );
      } else if (error.response?.status === 403) {
        setAlert(
          "Edamam denied access. Check your API plan and permissions."
        );
      } else if (error.response?.status === 429) {
        setAlert(
          "API request limit reached. Please try again later."
        );
      } else {
        setAlert(
          "Unable to load recipes. Check your API access and network connection."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData(query);
  };

  // Restore saved recipes and check Supabase authentication
  useEffect(() => {
    try {
      const storedRecipes = localStorage.getItem("recipes");

      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      }
    } catch (error) {
      console.error("Could not restore saved recipes:", error);
      localStorage.removeItem("recipes");
    }

    let mounted = true;

    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Authentication check failed:", error);
        return;
      }

      if (mounted) {
        setAuthenticated(Boolean(data.session));
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setAuthenticated(Boolean(session));
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error);
      setAlert("Unable to log out. Please try again.");
      return;
    }

    setAuthenticated(false);
    setAlert("");
  };

  return (
    <Router>
      <div className="App flex flex-col min-h-screen bg-gray-100">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white shadow-md flex flex-wrap justify-between items-center gap-3 p-4">
          <h1 className="text-xl font-bold text-red-500">
            <span className="text-blue-500">Food-</span>
            Bank
          </h1>

          <form
            onSubmit={onSubmit}
            className="flex flex-1 sm:flex-none gap-2"
          >
            <input
              type="text"
              name="query"
              value={query}
              onChange={onChange}
              autoComplete="off"
              placeholder="Search food"
              aria-label="Search for recipes"
              className="w-full sm:w-64 h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
            />

            <button
              type="submit"
              disabled={loading}
              className="h-12 px-4 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 rounded-md cursor-pointer"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {authenticated && (
            <button
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          )}
        </nav>

        <main className="container mx-auto mt-28 px-3 pb-8">
          <Routes>
            <Route
              path="/"
              element={
                !authenticated ? (
                  <div className="flex flex-col gap-6 items-center">
                    <div className="w-[90%] max-w-[500px]">
                      {isSignUp ? (
                        <SignUp
                          setAuthenticated={setAuthenticated}
                        />
                      ) : (
                        <Login
                          setAuthenticated={setAuthenticated}
                        />
                      )}
                    </div>

                    <button
                      className="text-blue-500 hover:underline"
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

                    {alert && (
                      <div
                        role="alert"
                        className="max-w-2xl mx-auto mb-4 p-3 rounded-md bg-red-100 text-red-700 text-center"
                      >
                        {alert}
                      </div>
                    )}

                    {loading && (
                      <p className="text-center text-gray-600 mb-4">
                        Loading delicious recipes...
                      </p>
                    )}

                    {!loading && recipes.length === 0 && !alert && (
                      <p className="text-center text-gray-600 my-8">
                        Search for chicken, rice, pasta, or another food
                        to discover recipes.
                      </p>
                    )}

                    <div className="recipes grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full max-w-5xl mx-auto">
                      {recipes.map((recipe) => (
                        <Recipe
                          key={recipe.id}
                          recipe={recipe}
                        />
                      ))}
                    </div>
                  </>
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
