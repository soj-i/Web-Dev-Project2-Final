import Header from "../components/molecules/header";
import InputRecipeForm from "../InputRecipeForm";

export default function Create() {
    return (
        <>
        <Header title="Create Recipe" homePage={false} />
        <InputRecipeForm />
        </>
    );
}