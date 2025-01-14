"use client";

import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecipeBookContext } from '@/app/components/contexts/RecipeStepsContext';
import { recipeStepTracker, Recipe, RecipeStep } from '@/app/components/molecules/cookbookSetup';
import Header from '@/app/components/organisms/header';
import { useRecipeEditContext } from '@/app/components/contexts/IdHandlingContext';

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
      <div className="pl-20 pt-10">
        <form onSubmit={handleSubmit}>
            <div> {/* Recipe name + input box */}
          <label htmlFor="recipe-name"
          className = "text-2xl mr-4">Recipe name: </label>
          <input
            id="recipe-name-input"
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
            className="border p-2 flex-row rounded bottom-24"
          />
          </div>
          {/* step text + list*/}
          <div className="bg-gray-500/50 rounded shadow-lg w-1/2 mt-8">
          <label htmlFor="recipe-name"
                 className="text-xl">Steps: </label>
          <ol className="list-disc list-inside p-10 text-lg space-y-6"> {/* list of steps */}
            {steps.map((step, index) => ( 
              <li 
              key={step.id} className="flex items-center mb-2">{/* text for steps */}
                <input
                  type="text"
                  value={step.value}
                  onChange={(e) => {
                    const newSteps = [...steps];
                    newSteps[index] = { ...newSteps[index], value: e.target.value };
                    setSteps(newSteps);
                  }}
                  className="border p-2 background w-2/6 mr-4 rounded"
                />
                <input
                  type="checkbox"
                  aria-label = "Mark as complete"
                  aria-checked={step.isCompleted}
                  checked={step.isCompleted}
                  onChange={() => handleToggleComplete(step.id)}
                  className="mr-2"
                />
                Mark as Complete
                <button
                  className="ml-4 bg-red-500 text-white rounded px-4 py-2"
                  aria-label = "Delete step"
                  onClick={() => handleDeleteStep(step.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ol>
          </div>
          <button
            aria-label = "Add Step"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded mr-10"
            onClick={handleAddStep}
            type="button"
          >
            Add Step
          </button>
          <button
            aria-label = "Submit Recipe"
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