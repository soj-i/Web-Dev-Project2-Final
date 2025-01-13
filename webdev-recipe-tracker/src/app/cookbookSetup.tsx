"use client";

export interface RecipeStep {
    id: string;
    value: string;
    isCompleted: boolean;
}

export interface Recipe {
    title: string;
    steps: RecipeStep[];
}

const cookbook: Map<string, Recipe> = new Map();

const recipeStepTracker = { // what we want to export
    
    createRecipe(): Recipe{
        return {
        title: '',
        steps: [],
        }   
    },

    getRecipeFromCookbook(id: string){

        if (cookbook.has(id)){
            return cookbook.get(id);
        }
        return null;
    },

    getRecipeSteps(id: string) {
        const foundRecipe = cookbook.get(id);
        if (foundRecipe) {
        return cookbook.get(id)!.steps;
        }
        return null;
    },

    addRecipeStepById(id: string, newStep: string){

        const foundRecipe = cookbook.get(id);
        if (foundRecipe) {
            const newStepID = `step-${Math.floor(Math.random() * Date.now())}`

            const newStepObject: RecipeStep = {
                id: newStepID,
                value: newStep,
                isCompleted: false,
            }

            foundRecipe.steps.push(newStepObject);
        }
        return null;
    },

    addRecipeStep(id: string | Recipe, newStep: string){

        let recipeReference;

        if (typeof id === 'string'){
            recipeReference = cookbook.get(id);
        }
        else { // object reference
            recipeReference = id;
        }

        if (recipeReference) {
            const newStepID = `step-${Math.floor(Math.random() * Date.now())}`

            const newStepObject: RecipeStep = {
                id: newStepID,
                value: newStep,
                isCompleted: false,
            }

            recipeReference.steps.push(newStepObject);
        }
        return null;
    },

    updateCheckStatus(recipe: Recipe, stepID: string){ // Recipe -> StepsArray -> StepObject -> field
         recipe.steps.forEach((step) => {
            if (step.id === stepID){
                step.isCompleted = !step.isCompleted;
            }
         })
    },

    addRecipeToCookbook(recipe: Recipe){
        const newStepID = `recipe-${Math.floor(Math.random() * Date.now())}`
        cookbook.set(newStepID, recipe);
    },

    removeRecipeFromCookbook(id: string){
        if (cookbook.has(id)){
            cookbook.delete(id);
    }

}
}
export {cookbook, recipeStepTracker};
