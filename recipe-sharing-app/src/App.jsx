import { Routes, Route } from "react-router-dom";   
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <div>
      <h1>Recipe Sharing App</h1>

      <Routes> {/* REQUIRED */}
        <Route 
          path="/" 
          element={
            <>
              <AddRecipeForm />
              <RecipeList />
            </>
          } 
        />

        <Route path="/recipe/:id" element={<RecipeDetails />} /> {/* REQUIRED */}
      </Routes>
    </div>
  );
}

export default App;
