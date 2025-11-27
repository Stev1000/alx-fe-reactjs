import useRecipeStore from "./recipeStore";

const FavoriteButton = ({ id }) => {
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const isFavorite = favorites.includes(id);

  const toggleFavorite = () => {
    if (isFavorite) removeFavorite(id);
    else addFavorite(id);
  };

  return (
    <button
      onClick={toggleFavorite}
      style={{
        background: isFavorite ? "gold" : "#444",
        color: isFavorite ? "black" : "white",
        padding: "6px 12px",
        borderRadius: "6px",
        marginTop: "10px",
        cursor: "pointer",
      }}
    >
      {isFavorite ? "★ Favorite" : "☆ Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
