import Image from "next/image";
import Header from "./components/molecules/header";

interface RecipeStep {
  id: string;
  value: string;
  isCompleted: boolean;
}

interface Recipe {
  title: string;
  steps: RecipeStep[];
}

export default function Home() {
  return (
    <>
    <Header title="Recipe Step" homePage={true} />
    </>
  );
}
