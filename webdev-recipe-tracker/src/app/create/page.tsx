import Header from "../components/organisms/header";
import InputRecipeForm from "../components/organisms/InputRecipeForm";
import RecipeSteps from "../components/organisms/RecipeSteps";

export default function Create() {
    return (
        <>
        <Header title="Create Recipe" homePage={false} />
        <InputRecipeForm />
        </>
    );
}