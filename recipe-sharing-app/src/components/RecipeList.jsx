import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";
import FavoriteButton from "./FavoriteButton";

const RecipeList = () => {
  const recipes = useRecipeStore((state) =>
    state.filteredRecipes.length > 0
      ? state.filteredRecipes
      : state.recipes
  );

  if (recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div>
      <h2>Recipes</h2>

      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
          <p>{recipe.description}</p>

          {/* ⭐ Safe Task 3 addition */}
          <FavoriteButton recipeId={recipe.id} />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
