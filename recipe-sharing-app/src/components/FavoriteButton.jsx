import useRecipeStore from "./recipeStore";

const FavoriteButton = ({ recipeId }) => {
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );

  const isFavorite = favorites.includes(recipeId);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }

    generateRecommendations(); // ⭐ ensures recommendations update
  };

  return (
    <button onClick={toggleFavorite} style={{ marginTop: "10px" }}>
      {isFavorite ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
