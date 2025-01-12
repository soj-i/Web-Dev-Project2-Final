import { useState } from 'react';
import { useRecipeBookContext } from './RecipeStepsContext';
import { recipeStepTracker } from './cookbookSetup';

export default function RecipeSteps () {
  const { recipes, setRecipes } = useRecipeBookContext();
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({});

  const handleCompleteCheck = (id: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [id]: !(prev[id]),
    }));
  };



  return (
    <ol className="pl-6 text-lg">
      {Object.entries(recipeSteps).map(([k, v]) => {
        const isComplete = completedSteps[k];
        return (
          <li key={k} className="flex items-center">
            <label style={{ textDecoration: isComplete ? 'line-through' : 'none' }}>
              {v}
            </label>
            <input
              type="checkbox"
              checked={isComplete}
              onChange={() => handleCompleteCheck(k)}
              className="ml-2"
            />
          </li>
        );
      })}
    </ol>
  );
};
