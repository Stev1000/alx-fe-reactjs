import { useParams } from "react-router-dom";
import useRecipeStore from "./recipeStore";

import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";
import FavoriteButton from "./FavoriteButton";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      {/* ⭐ Task 3: Add to Favorites */}
      <FavoriteButton id={recipe.id} />

      {/* Task 1: Edit Recipe */}
      <EditRecipeForm recipe={recipe} />

      {/* Task 1: Delete Recipe */}
      <DeleteRecipeButton id={recipe.id} />
    </div>
  );
};

export default RecipeDetails;
