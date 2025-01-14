"use client";


import { useRouter } from "next/navigation";
import Header from "./components/organisms/header";
import RecipeCard from "./components/organisms/RecipeCard";
import { useRecipeBookContext } from "./components/contexts/RecipeStepsContext";
import { useState } from "react";
import { useRecipeEditContext } from "./components/contexts/IdHandlingContext";

interface RecipeStep {
  id: string;
  value: string;
  isCompleted: boolean;
}

interface Recipe {
  title: string;
  steps: RecipeStep[];
}

export default function Home() {
  const { recipes, setRecipes } = useRecipeBookContext();
  const router = useRouter();
  const {idTarget, setIdTarget} = useRecipeEditContext();

  const handleSelectRecipe = (id: string) => {
    // Navigate to the edit page for the selected recipe

    setIdTarget(id);

    router.push(`/recipes/${id}`);
  };

  const handleDeleteRecipe = (id: string) => {
    // Logic to handle deleting a recipe
    const newRecipes = new Map(recipes);
    newRecipes.delete(id);
    setRecipes(newRecipes);
  };

  return (
    <>
      <Header title="Cookbook Recipes" homePage={true} />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from(recipes.entries()).map(([id, recipe]) => (
            <RecipeCard
              key={id}
              recipe={{ ...recipe, id }}
              onSelectRecipe={handleSelectRecipe}
              onDeleteRecipe={handleDeleteRecipe}
            />
          ))}
        </div>
      </div>
    </>
  );
}