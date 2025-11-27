//import { useRecipeStore } from "./recipeStore";
import useRecipeStore from "./recipeStore";

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    filterRecipes();  // <-- THIS FIXES THE FILTER
  };

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={handleChange}
      style={{ width: "400px", padding: "10px", marginBottom: "20px" }}
    />
  );
};

export default SearchBar;
