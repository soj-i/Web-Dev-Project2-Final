"use client";
import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useRecipeBookContext } from '../contexts/RecipeStepsContext';
import { recipeStepTracker, Recipe } from '../molecules/cookbookSetup';

export default function InputRecipeForm() {
    const [recipeName, setRecipeName] = useState(''); // recipe name input
    const [recipeStep, setRecipeStep] = useState(''); // recipe step input
    const [currRecipe, setCurrRecipe] = useState<Recipe | null>(null); // current recipe being created

    const { recipes, setRecipes } = useRecipeBookContext();
    const router = useRouter();
    
    useEffect(() => {
        const newRecipe = recipeStepTracker.createRecipe();
        setCurrRecipe(newRecipe);
    }, []); // runs once

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
            currRecipe.title = recipeName; 

            // create a new Map object to trigger re-render
            const newRecipes = new Map(recipes);

            newRecipes.set(`recipe-${Math.floor(Math.random() * Date.now())}`, currRecipe);
            setRecipes(newRecipes);

            // redirect to the main page or another page
            router.push('/');
        }
    };

    return (
        <div id = "create-recipe-form" 
        aria-label = "Create recipe form"
        className=" mx-auto p-4 bg-gray-500/50 rounded shadow-lg w-1/2 mt-8">
            <form onSubmit={handleSubmit} id="create-recipe-form"
            className = " flex flex-col w-2/5">


                <label htmlFor="recipe-name-input"
                       className = "text-2xl mr-4">Recipe name:</label>
                
                <input
                    id="recipe-name-input"
                    type="text"
                    tabIndex = {0}
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    required
                    aria-required="true"
                    className="border p-2 rounded w-1/2"
                />

                <label htmlFor="recipe-step-input"
                       className = "text-2xl mr-4" >New step:</label>
                <textarea
                    id="recipe-step-input"
                    rows={3}
                    tabIndex = {0}
                    value={recipeStep}
                    onChange={(e) => setRecipeStep(e.target.value)}
                    className="border p-2 rounded w-1/2"
                ></textarea>
                
                <div className  = "flex flex-row space-x-8 pt-4">
                <button
                    id="add-btn"
                    tabIndex = {0}
                    aria-label = "Add step"
                    onClick={handleAddStep}
                    type="button"
                    className="bg-orange-500/50 rounded py-2 px-4 shadow w-24"
                >
                    Add step
                </button>

                <button
                    id="submit-btm"
                    tabIndex = {0}
                    type="submit"
                    aria-label = "Submit recipe"
                    className="bg-green-500/75 rounded shadow w-24"
                >
                    Submit
                </button>
                </div>
            </form>

            {currRecipe && (
                <div>
                    <ol className="pl-6 text-lg"
                        aria-label = "Recipe steps">
                        {currRecipe.steps.map((step) => (
                            <li key={step.id} className="flex-row items-center">
                                <label style={{ textDecoration: step.isCompleted ? 'line-through' : 'none' }}>
                                    {step.value}
                                </label>
                                <input
                                    aria-label = "Mark as complete"
                                    type="checkbox"
                                    tabIndex = {0}
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