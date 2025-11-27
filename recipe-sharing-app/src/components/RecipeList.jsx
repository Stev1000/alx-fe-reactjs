import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  const listToShow =
    searchTerm.trim().length > 0 ? filteredRecipes : recipes;

  return (
    <div>
      <h2>Recipes</h2>

      {listToShow.map((recipe) => (
        <div key={recipe.id} style={{ marginBottom: "20px" }}>
          <Link to={`/recipe/${recipe.id}`}>
            <h3>{recipe.title}</h3>
          </Link>
          <p>{recipe.description}</p>
        </div>
      ))}

      {listToShow.length === 0 && <p>No recipes found.</p>}
    </div>
  );
};

export default RecipeList;
