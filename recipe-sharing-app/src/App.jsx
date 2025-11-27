import "./App.css";
import { Routes, Route } from "react-router-dom";

import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";

function App() {
  return (
    <div className="container">
      <h1>Recipe Sharing App</h1>

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Task 2 Search */}
              <SearchBar />

              {/* Task 0 Add Recipe */}
              <AddRecipeForm />

              {/* Task 1 + Task 2 Recipe List */}
              <RecipeList />

              {/* ⭐ Task 3: Favorites & Recommendations */}
              <FavoritesList />
              <RecommendationsList />
            </>
          }
        />

        {/* Task 1: Recipe Details */}
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}

export default App;
