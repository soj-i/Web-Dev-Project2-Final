"use client";

import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecipeBookContext } from '@/app/RecipeStepsContext';
import { recipeStepTracker, Recipe, RecipeStep } from '@/app/cookbookSetup';
import Header from '@/app/components/molecules/header';
import { useRecipeEditContext } from '@/app/IdHandlingContext';

export default function EditRecipe() {
  const router = useRouter();

  // context for cookbook
  const { recipes, setRecipes } = useRecipeBookContext();
  

  // recipe building state + steps
  const [recipe, setRecipe] = useState<Recipe | null>();
  const [steps, setSteps] = useState<RecipeStep[]>([]);
  const [recipeName, setRecipeName] = useState<string>('');
  const {idTarget, setIdTarget} = useRecipeEditContext();
   // anytime this var changes, aka when the page is called


  let currId = idTarget;

  useEffect(() => {
    if (currId && recipes.size > 0) {
      const foundRecipe = recipes.get(currId);
      if (foundRecipe) {
        setRecipe(foundRecipe);
        setSteps(foundRecipe.steps);
        setRecipeName(foundRecipe.title);
      }
    }
  }, [currId, recipes]);


  const handleDeleteStep = (stepId: string) => {
    setSteps((prevSteps) => prevSteps.filter((step) => step.id !== stepId));
  };

  const handleToggleComplete = (stepId: string) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, isCompleted: !step.isCompleted } : step
      )
    );
  };
  const handleAddStep = () => {
    const newStep: RecipeStep = {
      id: `step-${Math.floor(Math.random() * Date.now())}`,
      value: '',
      isCompleted: false,
    };
    setSteps((prevSteps) => [...prevSteps, newStep]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (recipe) {
      /*
        - remove recipe from cookbook with same id as curr recipe
        - add updated recipe to cookbook
    
      */
     recipeStepTracker.removeRecipeFromCookbook(currId!); // Remove the old recipe

     
      const updatedRecipe = { ...recipe, title: recipeName, steps };
    //   recipeStepTracker.addRecipeToCookbook(updatedRecipe); // Update the cookbook
      setRecipes(new Map(recipes.set(currId!, updatedRecipe))); // Update the context state
      setIdTarget('');

      router.push('/');
    }
  };

    if (!recipe) {
        return <div> Error: Recipe Not Found </div>;
    }

  return (
    <div>
      <Header title={`Edit Recipe: ${recipe.title}`} homePage={false} />
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <label htmlFor="recipe-name">Recipe name:</label>
          <input
            id="recipe-name-input"
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
            className="border p-2 flex-grow mr-2 rounded"
          />
          <ol className="list-disc list-inside pl-6 text-lg">
            {steps.map((step, index) => (
              <li key={step.id} className="flex items-center mb-2">
                <input
                  type="text"
                  value={step.value}
                  onChange={(e) => {
                    const newSteps = [...steps];
                    newSteps[index] = { ...newSteps[index], value: e.target.value };
                    setSteps(newSteps);
                  }}
                  className="border p-2 flex-grow mr-2 rounded"
                />
                <input
                  type="checkbox"
                  checked={step.isCompleted}
                  onChange={() => handleToggleComplete(step.id)}
                  className="mr-2"
                />
                <button
                  className="ml-4 text-red-500"
                  onClick={() => handleDeleteStep(step.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ol>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleAddStep}
            type="button"
          >
            Add Step
          </button>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}