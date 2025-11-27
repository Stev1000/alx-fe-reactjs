import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],

  // Add new recipe
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe]
    })),

  // Initialize recipe list
  setRecipes: (recipes) => set({ recipes })
}));

export default useRecipeStore;