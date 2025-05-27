
import React from 'react';

interface RecipeStep {
    id: string;
    value: string;
    isCompleted: boolean;
}

interface Recipe {
    id: string;
    title: string;
    steps: RecipeStep[];
}

interface RecipeCardProps {
    recipe: Recipe;
    onSelectRecipe: (id: string) => void;
    onDeleteRecipe: (id: string) => void;
}

export default function RecipeCard({ recipe, onSelectRecipe, onDeleteRecipe }: RecipeCardProps) {
    return (
        <div className="p-6 bg-white rounded-xl shadow-lg space-y-4">
            <h3 className="text-xl font-bold text-black">{recipe.title}</h3>
            <ul className="list-disc list-inside text-slate-500">
                {recipe.steps.map((step) => (
                    <li key={step.id} style={{ textDecoration: step.isCompleted ? 'line-through' : 'none' }}>
                        {step.value}
                    </li>
                ))}
            </ul>
            <div className="flex space-x-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => onSelectRecipe(recipe.id)}
                >
                    Edit Recipe
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => onDeleteRecipe(recipe.id)}
                >
                    Remove Recipe
                </button>
            </div>
        </div>
    );
}