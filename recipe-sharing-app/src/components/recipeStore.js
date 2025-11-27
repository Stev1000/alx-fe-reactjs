import { create } from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [],

  // ⭐ Task 0 — Add recipe
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  // ⭐ Task 1 — Delete recipe
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),

  // ⭐ Task 1 — Update recipe
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  // ⭐ Task 2 — Search
  searchTerm: "",
  filteredRecipes: [],
  setSearchTerm: (term) => set({ searchTerm: term }),
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  // ⭐ Task 3 — Favorites
  favorites: [],
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // ⭐ Task 3 — Recommendations
  recommendations: [],
  generateRecommendations: () =>
    set((state) => {
      const recommended = state.recipes.filter((recipe) =>
        state.favorites.includes(recipe.id)
      );
      return { recommendations: recommended };
    }),
}));

export default useRecipeStore;
