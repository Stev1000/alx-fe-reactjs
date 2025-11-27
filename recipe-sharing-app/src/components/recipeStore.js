import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],

  // Task 0
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  // Task 1
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  // Task 2
  searchTerm: "",
  filteredRecipes: [],
  setSearchTerm: (term) => set({ searchTerm: term }),
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  // ⭐ TASK 3 — FAVORITES
  favorites: [],

  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // ⭐ TASK 3 — RECOMMENDATIONS
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
