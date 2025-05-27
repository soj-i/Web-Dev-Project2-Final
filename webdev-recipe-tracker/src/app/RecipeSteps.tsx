"use client";

import { useState } from 'react';
import { useRecipeBookContext } from './RecipeStepsContext';
import { recipeStepTracker } from './cookbookSetup';

export default function RecipeSteps () {
  const { recipes, setRecipes } = useRecipeBookContext();
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({});

  const handleCompleteCheck = (recipeId: string, stepId: string) => {
    const recipe = recipeStepTracker.getRecipeFromCookbook(recipeId);
    if (recipe) {
        recipeStepTracker.updateCheckStatus(recipe, stepId);
        const updatedRecipes = new Map(recipes);
        setRecipes(updatedRecipes);
    }
};




return (
    <ol className="pl-6 text-lg">
        {Array.from(recipes!.entries()).map(([recipeId, recipe]) => (
            <li key={recipeId}>
                <h3>{recipe.title}</h3>
                <ul>
                    {recipe.steps.map((step) => {
                        const isComplete = step.isCompleted;
                        return (
                            <li key={step.id} className="flex items-center">
                                <label style={{ textDecoration: isComplete ? 'line-through' : 'none' }}>
                                    {step.value}
                                </label>
                                <input
                                    type="checkbox"
                                    checked={isComplete}
                                    onChange={() => handleCompleteCheck(recipeId, step.id)}
                                />
                            </li>
                        );
                    })}
                </ul>
            </li>
        ))}
    </ol>
);
}

