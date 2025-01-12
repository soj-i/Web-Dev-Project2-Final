"use client";
import React, { createContext, useContext, useState, ReactNode, Dispatch, useEffect } from 'react';

import cookbook, { Recipe, RecipeStep } from './cookbookSetup';

/* 


export interface RecipeStep {
    id: string;
    value: string;
    isCompleted: boolean;
}

export interface Recipe {
    title: string;
    steps: RecipeStep[];
}

export const cookbook: Map<string, Recipe> = new Map();

*/


const defaultRecipe = { 
    title: "recipe 1",
    steps: [{id: "step-1", value: "step 1", isCompleted: false},
            {id: "step-2", value: "step-2", isCompleted: true}
           ]
}
cookbook.cookbook.set("recipe-1", defaultRecipe);

interface CookbookType{
    recipes: Map<string, Recipe> | undefined; // overall cook book. undefined initially for value in provider
    setRecipes: Dispatch<any>;  // update overall cook book
}

const RecipeBookContext = createContext<CookbookType>(
    {
        recipes: cookbook.cookbook,
        setRecipes: ()=>{}
    }
)

export const useRecipeBookContext = () => useContext(RecipeBookContext);

export const RecipeStepsContextProvider = ({ children }: { children: ReactNode }) => {
    const [recipes, setRecipes] = useState<Map<string, Recipe>>(cookbook);
 
 
  return (
    <RecipeBookContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipeBookContext.Provider>
  );
};