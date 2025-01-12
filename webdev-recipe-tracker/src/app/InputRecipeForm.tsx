"use client";
import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useRecipeBookContext } from './RecipeStepsContext';
import { recipeStepTracker, Recipe } from './cookbookSetup';

export default function InputRecipeForm() {
    const [recipeName, setRecipeName] = useState(''); // Recipe name input
    const [recipeStep, setRecipeStep] = useState(''); // Recipe step input
    const [currRecipe, setCurrRecipe] = useState<Recipe | null>(null); // Current recipe being created

    const { recipes, setRecipes } = useRecipeBookContext();
    const router = useRouter();
    
    useEffect(() => {
        const newRecipe = recipeStepTracker.createRecipe();
        setCurrRecipe(newRecipe);
    }, []);

    const handleAddStep = (e: FormEvent) => {
        e.preventDefault();
        
        if (currRecipe) { // if recipe was started
            recipeStepTracker.addRecipeStep(currRecipe, recipeStep); // add step to given recipe
            const updatedRecipe = { ...currRecipe }; // copy recipe
            setCurrRecipe(updatedRecipe); // flags for remount
            setRecipeStep(''); // clear input
        } else {
            return;
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (currRecipe) {
            currRecipe.title = recipeName; // set the recipe title
            recipeStepTracker.addRecipeToCookbook(currRecipe); // add the recipe to the cookbook

            // create a new Map object to trigger re-render
            const newRecipes = new Map(recipes);
            newRecipes.set(`recipe-${Math.floor(Math.random() * Date.now())}`, currRecipe);
            setRecipes(newRecipes);

            // redirect to the main page or another page
            router.push('/');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} id="test">
                <label htmlFor="recipe-name">Recipe name:</label>
                <input
                    id="recipe-name-input"
                    type="text"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    required
                />

                <label htmlFor="recipe-step">Recipe step:</label>
                <textarea
                    id="recipe-step-input"
                    rows={3}
                    value={recipeStep}
                    onChange={(e) => setRecipeStep(e.target.value)}
                ></textarea>

                <button
                    id="add-btn"
                    onClick={handleAddStep}
                    type="button"
                    className="bg-orange-500/50 rounded py-2 px-4 shadow"
                >
                    Add step
                </button>

                <button
                    id="submit-btm"
                    type="submit"
                    className="bg-green-500/75 rounded shadow"
                >
                    Submit
                </button>
            </form>

            {currRecipe && (
                <div>
                    <h3>Current Recipe: {currRecipe.title}</h3>
                    <ol className="pl-6 text-lg">
                        {currRecipe.steps.map((step) => (
                            <li key={step.id} className="flex items-center">
                                <label style={{ textDecoration: step.isCompleted ? 'line-through' : 'none' }}>
                                    {step.value}
                                </label>
                                <input
                                    type="checkbox"
                                    checked={step.isCompleted}
                                    onChange={() => {
                                        recipeStepTracker.updateCheckStatus(currRecipe, step.id);
                                        setCurrRecipe({ ...currRecipe });
                                    }}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}