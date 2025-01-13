"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, useEffect } from 'react';

interface recipeEditType{
    idTarget: string;
    setIdTarget: Dispatch<any>;
}

const RecipeEditContext = createContext<recipeEditType>(
    {
        idTarget: "",
        setIdTarget: ()=>{}
    }
)

export const useRecipeEditContext = () => useContext(RecipeEditContext);

export const RecipeEditContextProvider = ({ children }: { children: ReactNode }) => {
    const [idTarget, setIdTarget] = useState<string>("");
    
    return (
        <RecipeEditContext.Provider value={{ idTarget, setIdTarget }}>
            {children}
        </RecipeEditContext.Provider>
    );
};