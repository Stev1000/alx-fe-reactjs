import useRecipeStore from "./recipeStore";

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleClick = () => {
    deleteRecipe(id);
  };

  return (
    <button onClick={handleClick}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
