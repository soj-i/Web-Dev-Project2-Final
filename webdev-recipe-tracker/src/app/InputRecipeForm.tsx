"use client";
import {useState, FormEvent, use, useEffect} from 'react';
import { useRecipeBookContext } from './RecipeStepsContext';

import { useRouter } from 'next/navigation';

import { recipeStepTracker, Recipe } from './cookbookSetup';

export default function InputRecipeForm() {

    const [recipeName, setRecipeName] = useState(''); // recipe name input
    const [recipeStep, setRecipeStep] = useState(''); // recipe step input
    
    const [currRecipe, setCurrRecipe] = useState<Recipe| null>(null);
    const {recipes, setRecipes} = useRecipeBookContext();

    
    const router = useRouter();


    useEffect(() => {
        const newRecipe = recipeStepTracker.createRecipe();
        setCurrRecipe(newRecipe);
    }, []);
        

    const handleAddStep = (e: FormEvent) => {
        e.preventDefault();
        
        if (currRecipe){ // if recipe was started
            recipeStepTracker.addRecipeStep(currRecipe, recipeStep); // add step to given recipe
            const updatedRecipe = {...currRecipe}; // copy recipe

            setCurrRecipe(updatedRecipe); // flags for remount
            setRecipeStep(''); // clear input
        }
        else{
            return;
        }
    };

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();


      if (currRecipe) {
            currRecipe.title = recipeName; // sets recipe name
            recipeStepTracker.addRecipeToCookbook(currRecipe); // adds to cookbook
            const updatedBook = new Map(recipes); // refers to cookbook
            setRecipes(updatedBook);
      }
        router.push('/');
    }
    //   const newRecipe = {
    //     id: `recipe-${Math.floor(Math.random() * Date.now())}`,
    //     title: recipeName,
    //     steps: Object.values(recipeSteps),
    //   };
    //   const updatedRecipes = [...recipes, newRecipe];
    //   setRecipes(updatedRecipes);
    //   console.log('Updated recipes:', updatedRecipes);

    //   router.push('/');
    // };

    return (

      <form onSubmit={handleSubmit}
      id ='test'>
      <label htmlFor="recipe-name">Recipe name:</label>
      <input id="recipe-name-input" type="text" value={recipeName}
      onChange = {(e)=> setRecipeName(e.target.value)}
      required/>

      <label htmlFor="recipe-step">Recipe step:</label>
      <textarea
        id="recipe-step-input"
        rows={3}
        value={recipeStep}
        onChange={(e) => setRecipeStep(e.target.value)}
      ></textarea>

      <button id="add-btn" onClick={handleAddStep} type="button" className = 'bg-orange-500/50 rounded py-2 px-4 shadow'>
        Add step
      </button>

      <button id ="submit-btm" type="submit" className = 'bg-green-500/75 rounded shadow'>Submit</button>
    </form>);

}